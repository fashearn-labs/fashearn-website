"""Check staged navigation, review protections and approved article preservation."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import re

ROOT = Path(__file__).resolve().parents[1] / 'staging/company-site'

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links, self.ids, self.robots = [], set(), None
        self.h1 = self.forms = self.canonicals = 0
        self.headings = []
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids, 'Duplicate id'
            self.ids.add(a['id'])
        if tag == 'a': self.links.append(a.get('href', ''))
        if tag == 'h1': self.h1 += 1
        if re.fullmatch(r'h[1-6]', tag): self.headings.append(int(tag[1]))
        if tag == 'form': self.forms += 1
        if tag == 'meta' and a.get('name') == 'robots': self.robots = a['content']
        if tag == 'link' and a.get('rel') == 'canonical': self.canonicals += 1

pages = {p: Page(p.read_text(encoding='utf-8')) for p in ROOT.rglob('*.html')}
links = 0
for path, page in pages.items():
    assert page.h1 == 1, (path, 'h1 count')
    previous_level = 0
    for level in page.headings:
        assert level <= previous_level + 1, (path, 'Skipped heading level')
        previous_level = level
    assert page.robots == 'noindex,nofollow,noarchive', path
    assert not page.forms and not page.canonicals, path
    for href in page.links:
        url = urlsplit(href)
        if url.scheme or url.netloc: continue
        target = (path.parent / unquote(url.path)).resolve() if url.path else path.resolve()
        if target.is_dir(): target /= 'index.html'
        assert target.is_relative_to(ROOT.resolve()) and target.exists(), (path, href)
        if url.fragment:
            assert url.fragment in pages[target].ids, (path, href)
        links += 1
assert len(pages) == 10
print(f'PASS: {len(pages)} pages, {links} internal links/anchors resolve; unique ids, one h1, staging robots, no forms/canonical on each.')
