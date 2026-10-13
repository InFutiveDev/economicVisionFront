/**
 * BroadsheetCanvas – renders a CustomPageDesign (broadsheet layout) as a
 * newspaper-style page, matching the admin's EpaperBroadsheetCanvas.
 * Uses inline styles to avoid Tailwind dependency issues.
 */
export default function BroadsheetCanvas({ design, scale = 1 }) {
  const { masthead, topTicker, leadStory, sideStories, bottomStories } = design;

  return (
    <div
      id="epaper-broadsheet-render-target"
      style={{
        width: "900px",
        minHeight: "1270px",
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: "top center",
        fontFamily: "Georgia, 'Times New Roman', serif",
        backgroundColor: "#fcfbf7",
        color: "#111827",
        padding: "24px",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
        border: "1px solid #cbd5e1",
        position: "relative",
        userSelect: "none",
        boxSizing: "border-box",
      }}
    >
      {/* Volume / Price / Date strip */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid black", fontSize:"11px", fontFamily:"sans-serif", fontWeight:600, textTransform:"uppercase", letterSpacing:"0.05em", color:"#1e293b", paddingBottom:"4px" }}>
        <div>
          <span>{masthead.issueNo || "वर्ष: 14 | अंक: 248"}</span>
          <span style={{ margin:"0 8px", color:"#94a3b8" }}>|</span>
          <span>मूल्य: {masthead.price || "₹5.00"}</span>
        </div>
        <div>
          <span>{masthead.city || "इंदौर"}</span>
          <span style={{ margin:"0 8px", color:"#94a3b8" }}>|</span>
          <span>{masthead.dateString || ""}</span>
        </div>
        <div><span>पृष्ठ: {masthead.pageNo || 1} of {masthead.totalPages || 8}</span></div>
      </div>

      {/* Masthead */}
      <div style={{ padding:"16px 0", textAlign:"center", borderBottom:"2px solid black", borderTop:"2px solid black", marginTop:"4px" }}>
        {masthead.englishTitle && (
          <p style={{ fontSize:"10px", fontFamily:"sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.3em", color:"#b91c1c", marginBottom:"2px", margin:"0 0 2px" }}>
            {masthead.englishTitle}
          </p>
        )}
        <h1 style={{ fontSize:"60px", fontWeight:800, letterSpacing:"-0.025em", color:"black", lineHeight:1, padding:"4px 0", margin:0 }}>
          {masthead.paperName || "संवाद फर्स्ट"}
        </h1>
        <p style={{ fontSize:"12px", fontFamily:"sans-serif", color:"#475569", letterSpacing:"0.025em", marginTop:"4px", fontStyle:"italic", margin:"4px 0 0" }}>
          {masthead.tagline || "मध्यप्रदेश व छत्तीसगढ़ का निष्पक्ष एवं अग्रणी डिजिटल दैनिक समाचार पत्र"}
        </p>
      </div>

      {/* Markets Ticker Bar */}
      {topTicker?.items?.length > 0 && (
        <div style={{ margin:"8px 0", borderTop:"1px solid rgba(0,0,0,0.8)", borderBottom:"1px solid rgba(0,0,0,0.8)", backgroundColor:"#f8fafc", padding:"4px 12px", display:"flex", alignItems:"center", justifyContent:"space-between", fontSize:"11px", fontFamily:"sans-serif", fontWeight:600 }}>
          <span style={{ color:"#b91c1c", textTransform:"uppercase", letterSpacing:"0.05em", fontWeight:700 }}>बाज़ार आज:</span>
          {topTicker.items.map((item, idx) => (
            <span key={idx} style={{ display:"flex", alignItems:"center", gap:"4px" }}>
              <span style={{ color:"#334155" }}>{item.label}</span>
              <span style={{ fontWeight:700, color:"black" }}>{item.value}</span>
              {item.change && (
                <span style={{ fontSize:"10px", color: item.change.startsWith("+") ? "#065f46" : "#991b1b" }}>
                  ({item.change})
                </span>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Main Content Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(12, 1fr)", gap:"20px", marginTop:"12px" }}>

        {/* Lead Story – 8 cols */}
        <div style={{ gridColumn:"span 8", display:"flex", flexDirection:"column", borderRight:"1px solid #cbd5e1", paddingRight:"20px" }}>
          {leadStory?.kicker && (
            <span style={{ fontSize:"12px", fontFamily:"sans-serif", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#b91c1c", display:"block", marginBottom:"4px" }}>
              {leadStory.kicker}
            </span>
          )}
          <h2 style={{ fontSize:"30px", fontWeight:800, lineHeight:1.2, color:"black", letterSpacing:"-0.025em", margin:"0 0 8px" }}>
            {leadStory?.headline || "मुख्य शीर्षक यहाँ दर्ज करें"}
          </h2>
          {leadStory?.byline && (
            <p style={{ fontSize:"12px", fontFamily:"sans-serif", color:"#64748b", fontWeight:600, marginBottom:"8px", margin:"0 0 8px" }}>
              — {leadStory.byline}
            </p>
          )}
          {leadStory?.image && (
            <div style={{ marginBottom:"12px", overflow:"hidden", border:"1px solid #cbd5e1", backgroundColor:"#f1f5f9" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={leadStory.image} alt={leadStory.headline} style={{ width:"100%", height:"256px", objectFit:"cover", objectPosition:"top", display:"block" }} />
              {leadStory.caption && (
                <p style={{ fontSize:"11px", fontFamily:"sans-serif", color:"#475569", padding:"6px", backgroundColor:"#f8fafc", borderTop:"1px solid #e2e8f0", fontStyle:"italic", margin:0 }}>
                  {leadStory.caption}
                </p>
              )}
            </div>
          )}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", fontSize:"13px", lineHeight:1.75, color:"#0f172a", textAlign:"justify" }}>
            {leadStory?.paragraphs?.length > 0 ? (
              leadStory.paragraphs.map((p, idx) => (
                <p key={idx} style={{ marginBottom:"8px" }}>
                  {idx === 0 && (
                    <span style={{ fontFamily:"sans-serif", fontWeight:700, color:"#475569", marginRight:"4px" }}>
                      [{masthead.city}]
                    </span>
                  )}
                  {p}
                </p>
              ))
            ) : (
              <>
                <p>प्रमुख आर्थिक एवं राष्ट्रीय समाचारों की विस्तृत समीक्षा।</p>
                <p>विशेषज्ञों के अनुसार चालू वित्त वर्ष में तेजी की संभावना है।</p>
              </>
            )}
          </div>
        </div>

        {/* Right Sidebar – 4 cols */}
        <div style={{ gridColumn:"span 4", display:"flex", flexDirection:"column", gap:"16px" }}>
          {/* Boxed News Digest */}
          <div style={{ border:"2px solid #7f1d1d", backgroundColor:"rgba(254,242,242,0.4)", padding:"12px" }}>
            <h3 style={{ fontFamily:"sans-serif", fontSize:"12px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#7f1d1d", borderBottom:"1px solid rgba(127,29,29,0.4)", paddingBottom:"4px", textAlign:"center", margin:"0 0 8px" }}>
              संवाद बुलेटिन · Quick Digest
            </h3>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              {sideStories?.length > 0 ? (
                sideStories.map((story, idx) => (
                  <div key={story.id || idx} style={{ borderBottom: idx < sideStories.length - 1 ? "1px solid rgba(254,202,202,0.6)" : "none", paddingBottom: idx < sideStories.length - 1 ? "8px" : 0, fontSize:"12px" }}>
                    <h4 style={{ fontWeight:700, color:"#0f172a", lineHeight:1.3, margin:"0 0 4px" }}>• {story.headline}</h4>
                    {story.paragraphs?.[0] && <p style={{ fontSize:"11px", color:"#334155", lineHeight:1.6, margin:0 }}>{story.paragraphs[0]}</p>}
                  </div>
                ))
              ) : (
                <div style={{ fontSize:"12px" }}>
                  <h4 style={{ fontWeight:700, color:"#0f172a", margin:"0 0 4px" }}>• जीएसटी संग्रह में रिकॉर्ड वृद्धि</h4>
                  <p style={{ fontSize:"11px", color:"#334155", margin:0 }}>त्योहारी मांग से राजस्व में 10% वृद्धि।</p>
                </div>
              )}
            </div>
          </div>

          {/* Side Story 2 with thumbnail */}
          {sideStories?.[1] && (
            <div style={{ border:"1px solid #cbd5e1", padding:"10px", backgroundColor:"white" }}>
              {sideStories[1].image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={sideStories[1].image} alt="" style={{ width:"100%", height:"112px", objectFit:"cover", marginBottom:"8px", border:"1px solid #e2e8f0", display:"block" }} />
              )}
              <h4 style={{ fontWeight:700, fontSize:"14px", lineHeight:1.3, color:"black", margin:"0 0 4px" }}>{sideStories[1].headline}</h4>
              <p style={{ fontSize:"12px", color:"#334155", lineHeight:1.6, textAlign:"justify", margin:0 }}>{sideStories[1].paragraphs?.[0]}</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Stories */}
      <div style={{ marginTop:"20px", paddingTop:"12px", borderTop:"2px solid black" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"16px" }}>
          {bottomStories?.length > 0 ? (
            bottomStories.map((story, idx) => (
              <div key={story.id || idx} style={{ borderRight: idx < bottomStories.length - 1 ? "1px solid #cbd5e1" : "none", paddingRight: idx < bottomStories.length - 1 ? "12px" : 0 }}>
                {story.kicker && <span style={{ fontSize:"10px", fontFamily:"sans-serif", fontWeight:700, textTransform:"uppercase", color:"#b91c1c", display:"block", marginBottom:"2px" }}>{story.kicker}</span>}
                <h4 style={{ fontWeight:700, fontSize:"14px", lineHeight:1.3, color:"black", margin:"0 0 4px" }}>{story.headline}</h4>
                {story.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={story.image} alt="" style={{ width:"100%", height:"96px", objectFit:"cover", margin:"4px 0", border:"1px solid #e2e8f0", display:"block" }} />
                )}
                <p style={{ fontSize:"11px", color:"#1e293b", lineHeight:1.6, textAlign:"justify", margin:0 }}>{story.paragraphs?.[0]}</p>
              </div>
            ))
          ) : null}
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop:"24px", paddingTop:"8px", borderTop:"1px solid black", display:"flex", alignItems:"center", justifyContent:"space-between", fontSize:"10px", fontFamily:"sans-serif", fontWeight:600, color:"#475569", textTransform:"uppercase", letterSpacing:"0.1em" }}>
        <span>{masthead.paperName || "संवाद फर्स्ट"} Digital Broadsheet</span>
        <span>वेबसाइट: www.theeconomicvision.com</span>
        <span>अंक संख्या {masthead.issueNo || "248"} · {masthead.city}</span>
      </div>
    </div>
  );
}
