'use client';
import { useState } from 'react';
import './globals.css';

const LANGUAGES = ["JavaScript", "Python", "React", "Rust", "SQL"];

const SNIPPETS = Array.from({ length: 150 }, (_, i) => ({
  id: i + 1,
  lang: LANGUAGES[i % LANGUAGES.length],
  title: `${["Async", "Functional", "Recursive", "Optimized"][i % 4]} ${["Pattern", "Logic", "Utility", "Hook"][i % 4]} #${i + 1}`,
  code: i % 2 === 0 ? "const handle = async () => {\n  console.log('dev mode active');\n  await new Promise(r => setTimeout(r, 1000));\n  return true;\n};" : "def solve(data):\n    # Process data efficiently\n    return [x for x in data if x > 0]",
  explanation: `This is a highly optimized code snippet for ${LANGUAGES[i % LANGUAGES.length]}. It demonstrates best practices for handling asynchronous operations or complex data transformations without blocking the main thread.\n\nUsage:\n1. Copy the code into your module.\n2. Ensure all dependencies are met.\n3. Call the function with valid inputs.`
}));

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLang, setActiveLang] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adsDisabled, setAdsDisabled] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [pendingSnippet, setPendingSnippet] = useState(null);
  const [showFloatingAd, setShowFloatingAd] = useState(true);
  const itemsPerPage = 15;

  const handleSnippetClick = (snippet) => {
    if (adsDisabled) {
      setSelectedSnippet(snippet);
    } else {
      setPendingSnippet(snippet);
      setShowInterstitial(true);
      setTimeout(() => {
        setShowInterstitial(false);
        setSelectedSnippet(snippet);
        setPendingSnippet(null);
      }, 5000);
    }
  };

  const filtered = SNIPPETS.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) || s.lang.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLang = activeLang === 'All' || s.lang === activeLang;
    return matchesSearch && matchesLang;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const displayed = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="container">
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', position: 'relative'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
          <div>
            <div className="logo" onClick={() => setActiveLang('All')} style={{cursor: 'pointer'}}>&lt;/&gt; DevCheatSheet</div>
            <p className="desktop-only" style={{color: '#666', marginTop: '0.5rem'}}>150+ ready-to-copy developer snippets.</p>
          </div>
          <button className="burger-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
        <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`} style={{display: 'flex', gap: '1.5rem'}}>
          <a href="#" style={{color: activeLang === 'All' ? 'var(--accent)' : '#8b949e', textDecoration: 'none'}} onClick={(e) => {e.preventDefault(); setActiveLang('All'); setCurrentPage(1); setIsMobileMenuOpen(false);}}>All</a>
          {LANGUAGES.map(lang => (
            <a key={lang} href="#" style={{color: activeLang === lang ? 'var(--accent)' : '#8b949e', textDecoration: 'none'}} onClick={(e) => {e.preventDefault(); setActiveLang(lang); setCurrentPage(1); setIsMobileMenuOpen(false);}}>{lang}</a>
          ))}
        </nav>
      </header>

      <div className="search-wrap">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search by language or feature..." 
          value={searchTerm}
          onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
        />
      </div>

      <main>
        {displayed.map((snippet, index) => (
          <div key={`snippet-group-${snippet.id}`} style={{ display: 'contents' }}>
            <div className="snippet-card" style={{cursor: 'pointer', transition: 'border-color 0.2s'}} onClick={() => handleSnippetClick(snippet)} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent)'} onMouseOut={(e) => e.currentTarget.style.borderColor = '#30363d'}>
              <div className="snippet-header">
                <span style={{fontWeight: 600, fontSize: '1.1rem'}}>{snippet.title}</span>
                <span className="lang-tag">{snippet.lang}</span>
              </div>
              <pre className="snippet-body">
                <code>{snippet.code}</code>
              </pre>
            </div>
            {!adsDisabled && (index + 1) % 6 === 0 && (
              <div key={`ad-${snippet.id}`} className="dev-ad-bar">
                <span className="ad-label">DEV SPONSOR</span>
                <div className="ad-content">Try the new AI Code Reviewer for Enterprise Teams.</div>
              </div>
            )}
          </div>
        ))}
      </main>

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => {setCurrentPage(p => p - 1); window.scrollTo(0,0);}}>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => {setCurrentPage(p => p + 1); window.scrollTo(0,0);}}>Next</button>
        </div>
      )}

      {/* Snippet Viewer Modal */}
      {selectedSnippet && (
        <div className="modal-overlay" onClick={() => setSelectedSnippet(null)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(1,4,9,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{background: 'var(--card)', padding: '3rem', borderRadius: '12px', maxWidth: '800px', width: '90%', maxHeight: '90vh', overflowY: 'auto', border: '1px solid #30363d', position: 'relative'}}>
            <button onClick={() => setSelectedSnippet(null)} style={{position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#c9d1d9', fontSize: '1.5rem', cursor: 'pointer'}}>&times;</button>
            <span className="lang-tag" style={{marginBottom: '1rem', display: 'inline-block'}}>{selectedSnippet.lang}</span>
            <h2 style={{fontSize: '2rem', marginBottom: '2rem', color: '#fff'}}>{selectedSnippet.title}</h2>
            
            <div style={{background: 'var(--code-bg)', border: '1px solid #30363d', borderRadius: '8px', overflow: 'hidden', marginBottom: '2rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid #30363d'}}>
                <span style={{color: '#8b949e', fontSize: '0.8rem', fontFamily: 'Fira Code, monospace'}}>index.{selectedSnippet.lang === 'Python' ? 'py' : 'js'}</span>
                <button onClick={() => copyToClipboard(selectedSnippet.code)} style={{background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'Fira Code, monospace'}}>Copy Code</button>
              </div>
              <pre style={{padding: '1.5rem', overflowX: 'auto'}}>
                <code style={{fontSize: '1rem'}}>{selectedSnippet.code}</code>
              </pre>
            </div>
            
            <h3 style={{color: '#fff', marginBottom: '1rem'}}>Explanation</h3>
            <p style={{color: '#8b949e', whiteSpace: 'pre-wrap', lineHeight: '1.6'}}>{selectedSnippet.explanation}</p>
            
            {!adsDisabled && (
              <div className="dev-ad-bar" style={{marginTop: '3rem'}}>
                <span className="ad-label">TOOL SPONSOR</span>
                <div className="ad-content">Deploy this snippet instantly on Vercel.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interstitial Ad Modal */}
      {showInterstitial && (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="modal-content" style={{background: '#111', padding: '3rem', borderRadius: '20px', maxWidth: '600px', width: '90%', textAlign: 'center', border: '1px solid #333', position: 'relative'}}>
            <span className="ad-tag" style={{display: 'inline-block', marginBottom: '1.5rem', color: 'var(--accent)', fontWeight: 'bold', letterSpacing: '2px'}}>SPONSORED PLATFORM</span>
            <h2 style={{fontSize: '2rem', marginBottom: '1rem'}}>Cloud Server Hosting</h2>
            <p style={{color: '#aaa', marginBottom: '2rem'}}>Deploy your applications globally with 99.99% uptime. Get $100 free credit.</p>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
              <button onClick={() => {setShowInterstitial(false); setSelectedSnippet(pendingSnippet); setPendingSnippet(null);}} style={{padding: '1rem 2rem', background: 'transparent', border: '1px solid #444', color: '#fff', borderRadius: '8px', cursor: 'pointer'}}>Skip Ad</button>
              <button style={{padding: '1rem 2rem', background: 'var(--accent)', border: 'none', color: '#000', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer'}}>Claim Credit</button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Upgrade Modal */}
      {showPremiumModal && (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="modal-content" style={{background: '#111', padding: '4rem 3rem', borderRadius: '20px', maxWidth: '500px', width: '90%', textAlign: 'center', border: '1px solid var(--accent)', position: 'relative'}}>
            <button onClick={() => setShowPremiumModal(false)} style={{position: 'absolute', top: '1rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer'}}>&times;</button>
            <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>DevCheatSheet <span style={{color: 'var(--accent)'}}>PRO</span></h2>
            <p style={{color: '#aaa', fontSize: '1.1rem', marginBottom: '2rem'}}>Unlock terminal integration, offline access, and completely disable all advertisements.</p>
            <button onClick={() => {setAdsDisabled(true); setShowPremiumModal(false); setShowFloatingAd(false);}} style={{width: '100%', padding: '1.2rem', background: 'var(--accent)', border: 'none', color: '#000', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', marginBottom: '1rem'}}>
              Upgrade for $3.99/mo
            </button>
            <p style={{color: '#666', fontSize: '0.9rem'}}>Cancel anytime.</p>
          </div>
        </div>
      )}

      {/* Floating Ad Banner */}
      {!adsDisabled && showFloatingAd && (
        <div style={{position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: 'calc(100% - 40px)', maxWidth: '700px', background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(10px)', border: '1px solid #333', borderRadius: '16px', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, boxShadow: '0 20px 40px rgba(0,0,0,0.5)'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <div style={{width: '40px', height: '40px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold'}}>&lt;/&gt;</div>
            <div>
              <p style={{fontSize: '0.8rem', color: '#888', margin: 0, textTransform: 'uppercase', letterSpacing: '1px'}}>Sponsored</p>
              <strong style={{color: '#fff', fontSize: '0.95rem'}}>Get GitHub Copilot Enterprise</strong>
            </div>
          </div>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <button style={{background: '#fff', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem'}}>Try Now</button>
            <button onClick={() => setShowFloatingAd(false)} style={{background: 'none', border: 'none', color: '#888', fontSize: '1.5rem', cursor: 'pointer'}}>&times;</button>
          </div>
        </div>
      )}

      <footer className="dev-footer">
        <div className="footer-grid">
          <div className="footer-brand">&lt;/&gt;</div>
          <div className="footer-col">
            <h4>Languages</h4>
            <a href="#">JavaScript</a><a href="#">Python</a><a href="#">Rust</a>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <a href="#">Docs</a><a href="#">Tutorials</a>
            {adsDisabled ? (
              <span style={{color: 'var(--accent)', fontWeight: 'bold'}}>Pro Active</span>
            ) : (
              <a href="#" onClick={(e) => {e.preventDefault(); setShowPremiumModal(true);}} style={{color: 'var(--accent)'}}>Go Ad-Free</a>
            )}
          </div>
          <div className="footer-col">
            <h4>Follow</h4>
            <a href="#">GitHub</a><a href="#">Twitter</a><a href="#">StackOverflow</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 DevCheatSheet. | <a href="#">Terms</a> | <a href="#">Privacy</a></p>
        </div>
      </footer>
    </div>
  );
}
