"""Offline checks of the generated public package; never submits an enquiry."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, hashlib

root = Path(__file__).resolve().parents[1]
site = root / 'dist-release'
manifest = json.loads((root / 'work/release-manifest.json').read_text())
class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.ids=[]; self.links=[]; self.headings=[]; self.forms=[]; self.canon=[]
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag in ('h1','h2','h3','h4'): self.headings.append(int(tag[1]))
        if tag=='form': self.forms.append(a)
        if tag=='link' and a.get('rel')=='canonical': self.canon.append(a.get('href'))
        for key in ('href','src'):
            if key in a: self.links.append(a[key])

pages={route:Page((site/file).read_text(encoding='utf-8')) for route,file in zip(manifest['routes'],manifest['files'])}
assert len(pages)==17
links=0
for route,p in pages.items():
    assert len(p.ids)==len(set(p.ids)), ('duplicate id',route)
    assert p.headings.count(1)==1, ('h1',route)
    assert p.canon==['https://fashearn.io'+route], ('canonical',route)
    for prior,current in zip(p.headings,p.headings[1:]): assert current<=prior+1, ('heading jump',route)
    text=(site/('index.html' if route=='/' else route.strip('/')+'/index.html')).read_text(encoding='utf-8')
    assert 'noindex' not in text and '<iframe' not in text, route
    assert 'href="/privacy/"' in text and 'href="/cookies/"' in text and 'href="/terms/"' in text, route
    if route in ('/','/services/','/website-enquiry/','/private-pilot/'):
        assert 'Website Services' in text and 'RouteOps Pilot' in text, ('approved navigation missing',route)
        assert '/assets/approved-commercial.css' in text, ('approved theme missing',route)
    else:
        assert '<nav aria-label="Main navigation"><a href="/services/">Services</a>' in text, ('services navigation missing',route)
    for href in p.links:
        u=urlsplit(href)
        if u.scheme or u.netloc: continue
        assert href.startswith(('/', '#')), ('relative release URL',route,href)
        target=u.path or route
        file=site/target.lstrip('/')
        if target.endswith('/'): file=file/'index.html'
        assert file.is_file(), ('missing target',route,href)
        if u.fragment and target in pages: assert unquote(u.fragment) in pages[target].ids, ('missing anchor',route,href)
        links+=1
    assert len(p.forms)==(1 if route in ('/contact/','/website-enquiry/') else 0), route
assert pages['/contact/'].forms[0]['action']=='/api/trial'
assert pages['/website-enquiry/'].forms[0]['action']=='/api/website-enquiry'
assert pages['/contact/'].forms[0]['id']=='form01'
assert pages['/website-enquiry/'].forms[0]['id']=='website-enquiry-form'
home_html=(site/'index.html').read_text(encoding='utf-8')
assert 'Fashearn Labs · Websites and custom business systems' in home_html
assert 'Custom business systems' in home_html
assert 'Route Operations Dashboard v1.1' in home_html
assert 'One practical approach' not in home_html
assert 'Two different offers' not in home_html
assert 'mailto:info@fashearn.io?subject=Custom%20Business%20System%20Enquiry' in home_html
assert '£249 one-off' in home_html and '£49/month' in home_html
assert 'Website and operational spreadsheet support for RSMCR Logistics' in home_html
assert 'RSMCR uses the Dashboard' not in home_html
assert 'Shopify' not in home_html
services_html=(site/'website-enquiry/index.html').read_text(encoding='utf-8')
for field in ('name','company','email','project_type','project_details'):
    assert 'name="'+field+'"' in services_html, ('website field missing',field)
assert 'name="drivers"' not in services_html and 'name="phone"' not in services_html
assert 'cf-turnstile' in services_html
assert '/assets/website-enquiry-form.js' in services_html
assert '/api/trial' not in services_html
assert (site/'assets/website-enquiry-form.js').is_file()
assert (site/'assets/approved-commercial.css').is_file()
assert '£249' in (site/'services/index.html').read_text(encoding='utf-8')
assert 'PRIVATE PILOT' in (site/'private-pilot/index.html').read_text(encoding='utf-8')
assert (root/'functions/api/website-enquiry.js').is_file()
for file,expected in manifest['preserved'].items():
    actual=(root/file).read_bytes() if file.startswith('functions/') else (site/file).read_bytes()
    assert hashlib.sha256(actual).hexdigest()==expected, ('preserved file changed',file)
assert json.loads((site/'_routes.json').read_text())['include']==['/api/trial','/verify']  # New handler deliberately inactive
assert (site/'sitemap.xml').read_text().count('<loc>')==17
assert 'noindex,nofollow' in (site/'trial/success.html').read_text()
print(json.dumps({'result':'PASS','pages':len(pages),'local_links_and_assets':links,'preserved_files':len(manifest['preserved']),'business_details_complete':manifest['businessDetailsComplete']}))
