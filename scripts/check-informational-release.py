"""Offline checks of the generated public package; never submits an enquiry."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, hashlib, re

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
assert len(pages)==19
links=0
for route,p in pages.items():
    assert len(p.ids)==len(set(p.ids)), ('duplicate id',route)
    assert p.headings.count(1)==1, ('h1',route)
    assert p.canon==['https://fashearn.io'+route], ('canonical',route)
    for prior,current in zip(p.headings,p.headings[1:]): assert current<=prior+1, ('heading jump',route)
    text=(site/('index.html' if route=='/' else route.strip('/')+'/index.html')).read_text(encoding='utf-8')
    assert 'noindex' not in text and '<iframe' not in text, route
    assert 'href="/privacy/"' in text and 'href="/cookies/"' in text and 'href="/terms/"' in text, route
    nav = re.search(r'<nav\b[^>]*>([\s\S]*?)</nav>', text)
    assert nav, ('navigation missing', route)
    nav_links = re.findall(r'<a\b[^>]*href="([^"]+)"', nav.group(1))
    assert not set(nav_links) & {'/privacy/', '/cookies/', '/terms/'}, ('legal links in main navigation', route)
    footer = text.split('</main>', 1)[-1]
    assert text.count('src="/assets/images/fashearn-arrow.svg"')==2, ('header/footer arrow mark missing',route)
    assert '<span class="mark">↗</span>' not in text, ('old framed arrow remains',route)
    assert 'FASHEARN LABS<small>INTELLIGENT SYSTEMS</small>' in text, ('brand text missing',route)
    assert all('href="' + path + '"' in footer for path in ('/privacy/', '/cookies/', '/terms/')), ('legal footer links missing', route)
    if route in ('/', '/services/', '/website-enquiry/', '/private-pilot/', '/custom-systems/', '/our-work/'):
        assert nav_links == ['/', '/services/', '/custom-systems/', '/our-work/', '/private-pilot/', '/contact/'], ('commercial navigation drift', route, nav_links)
    if route in ('/','/services/','/website-enquiry/','/private-pilot/','/custom-systems/','/our-work/'):
        assert 'Websites' in text and 'RouteOps Pilot' in text and 'Custom Systems' in text and 'Our Work' in text, ('approved navigation missing',route)
        assert '/assets/approved-commercial.css' in text, ('approved theme missing',route)
    else:
        assert '<nav aria-label="Main navigation"><a href="/services/">Services</a>' in text, ('services navigation missing',route)
        assert '/custom-systems/' in nav_links and '/our-work/' in nav_links, ('new page navigation missing',route)
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
assert 'RSMCR Logistics' in home_html and '/assets/images/rsmcr-homepage-full.avif' in home_html and 'not a claim that RSMCR is a current Dashboard customer' in home_html
assert 'raw.githubusercontent.com/fashearn-labs/rsmcr-website' not in home_html, 'private RSMCR asset on homepage'
assert hashlib.sha256((site/'assets/images/rsmcr-homepage-card.avif').read_bytes()).hexdigest()=='827905e8ef929f2df1931db0754fc38cf5e6b4c4a8fa92751e10d52caa4024bc', 'supplied screenshot missing or changed'
assert hashlib.sha256((site/'assets/images/rsmcr-homepage-full.avif').read_bytes()).hexdigest()=='f913ca6837c13d87f2839b21d8b0aa26d52bad488b28b30656c4c776b72e9af9', 'complete RSMCR screenshot missing or changed'
assert home_html.count('class="work-card home-work-card"')==2, 'Home work panels not paired'
assert home_html.count('class="work-media home-work-media')==2, 'Home media areas not paired'
assert 'class="commercial-grid home-work-grid"' in home_html
assert 'href="/assets/approved-commercial.css?v=home-work-panels-20261101"' in home_html, 'Home CSS refresh missing'
assert 'FASHEARN LABS · IN-HOUSE SOFTWARE' in home_html and 'RSMCR LOGISTICS · BUSINESS WEBSITE' in home_html
assert 'object-fit:contain' in (site/'assets/approved-commercial.css').read_text() and '#home #work .home-work-card' in (site/'assets/approved-commercial.css').read_text()

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
assert (site/'assets/images/fashearn-arrow.svg').is_file()
systems_html=(site/'custom-systems/index.html').read_text(encoding='utf-8')
work_html=(site/'our-work/index.html').read_text(encoding='utf-8')
assert 'Business software.' in systems_html and 'Operational dashboards' in systems_html
assert 'RSMCR Logistics' in work_html and 'Route Operations Dashboard v1.1' in work_html
assert 'not a Route Operations Dashboard deployment' in work_html
assert 'href="/custom-systems/"' in home_html
assert '£249' in (site/'services/index.html').read_text(encoding='utf-8')
pilot_html=(site/'private-pilot/index.html').read_text(encoding='utf-8')
assert 'PRIVATE PILOT' in pilot_html
assert 'routeops-dashboard-v1.1.png' in pilot_html and 'full-dash' in pilot_html
assert 'routeops-pay-run-v1.1.webp' in pilot_html and 'routeops-exception-centre-v1.1.webp' in pilot_html and 'routeops-reports-exports-v1.1.webp' in pilot_html
assert 'Fashearn_Labs_Route_Operations_Dashboard_v1.1_Web_Square_Guide.pdf' in pilot_html
assert '/assets/pilot-video.js' in pilot_html and '4FONAL7q9os' in pilot_html
assert (site/'assets/pilot-video.js').is_file()
assert (root/'functions/api/website-enquiry.js').is_file()
for file,expected in manifest['preserved'].items():
    actual=(root/file).read_bytes() if file.startswith('functions/') else (site/file).read_bytes()
    assert hashlib.sha256(actual).hexdigest()==expected, ('preserved file changed',file)
assert json.loads((site/'_routes.json').read_text())['include']==['/api/trial','/verify','/api/website-enquiry']  # Owner-authorised Website Enquiries release
assert (site/'sitemap.xml').read_text().count('<loc>')==19
assert 'noindex,nofollow' in (site/'trial/success.html').read_text()
print(json.dumps({'result':'PASS','pages':len(pages),'local_links_and_assets':links,'preserved_files':len(manifest['preserved']),'business_details_complete':manifest['businessDetailsComplete']}))
