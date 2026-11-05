/* ===== \u8b0e\u5323\uff1a\u77ed\u5287\u6d77\u5831 + \u76f4\u5f0f\u9810\u544a\u7247 ===== */
(function(){
let uidc=0;const U=()=>'t'+(++uidc);
const R=(n,f)=>{let s='';for(let i=0;i<n;i++)s+=f(i);return s};

/* ---------- characters (shared bust style with the games) ---------- */
const FACES={
 n:`<circle cx="33" cy="38" r="1.9" fill="#1a1410"/><circle cx="47" cy="38" r="1.9" fill="#1a1410"/><path d="M29 32.5h7M44 32.5h7" stroke="#2a201a" stroke-width="1.6" stroke-linecap="round"/><path d="M36 47q4 1.6 8 0" stroke="#7a4a3a" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
 h:`<path d="M30.5 39q2.5-3 5 0M44.5 39q2.5-3 5 0" stroke="#1a1410" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M29 31h7M44 31h7" stroke="#2a201a" stroke-width="1.6" stroke-linecap="round"/><path d="M34.5 45.5q5.5 5 11 0" stroke="#7a4a3a" stroke-width="1.8" fill="#b65a4a" stroke-linecap="round"/>`,
 s:`<circle cx="33" cy="38" r="3.3" fill="#fff"/><circle cx="47" cy="38" r="3.3" fill="#fff"/><circle cx="33" cy="38.3" r="1.4" fill="#1a1410"/><circle cx="47" cy="38.3" r="1.4" fill="#1a1410"/><path d="M29 31.5l7-2.2M44 29.3l7 2.2" stroke="#2a201a" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="40" cy="48" rx="2.3" ry="2.9" fill="#5a2a22"/>`,
 a:`<circle cx="33" cy="38.5" r="1.9" fill="#1a1410"/><circle cx="47" cy="38.5" r="1.9" fill="#1a1410"/><path d="M29 30.5l7 2.6M51 30.5l-7 2.6" stroke="#2a201a" stroke-width="1.8" stroke-linecap="round"/><path d="M35.5 48h9" stroke="#7a4a3a" stroke-width="1.8" stroke-linecap="round"/>`,
 t:`<path d="M30.5 38.5h5M44.5 38.5h5" stroke="#1a1410" stroke-width="1.8" stroke-linecap="round"/><path d="M29 33l7-2M44 31l7 2" stroke="#2a201a" stroke-width="1.6" stroke-linecap="round"/><path d="M36 49q4-2.6 8 0" stroke="#7a4a3a" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M31 41.5q.6 3 .2 5" stroke="#9fd0f0" stroke-width="1.3" fill="none" stroke-linecap="round"/>`,
 sly:`<circle cx="33" cy="38.5" r="1.9" fill="#1a1410"/><path d="M44.5 38.5q2.5-1.6 5 0" stroke="#1a1410" stroke-width="1.8" fill="none"/><path d="M29 32.5h7M44 30l7 1.5" stroke="#2a201a" stroke-width="1.6" stroke-linecap="round"/><path d="M35 47.5q6 1.6 10-2" stroke="#7a4a3a" stroke-width="1.7" fill="none" stroke-linecap="round"/>`,
 shock:`<circle cx="33" cy="37.5" r="3.7" fill="#fff"/><circle cx="47" cy="37.5" r="3.7" fill="#fff"/><circle cx="33" cy="37.5" r="1.2" fill="#1a1410"/><circle cx="47" cy="37.5" r="1.2" fill="#1a1410"/><path d="M29 29.5l7-1.4M44 28.1l7 1.4" stroke="#2a201a" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="40" cy="49" rx="3.4" ry="4.4" fill="#5a2a22"/>`
};
function bust(p,f){
  if(p.sil)return `<svg viewBox="0 0 80 80" aria-hidden="true"><path d="M8 80q4-24 32-24t32 24z" fill="#020202"/><ellipse cx="40" cy="38" rx="17" ry="20" fill="#020202"/><circle cx="33" cy="38" r="2.4" fill="#ff3b30"/><circle cx="47" cy="38" r="2.4" fill="#ff3b30"/><circle cx="33" cy="38" r="6" fill="#ff3b30" opacity=".22"/><circle cx="47" cy="38" r="6" fill="#ff3b30" opacity=".22"/></svg>`;
  const sk=p.skin||'#f0d0b2',hc=p.hair||'#221a16';let back='',acc='';
  if(p.style==='long')back=`<path d="M21 36q0-21 19-21t19 21l2 30H19z" fill="${hc}"/>`;
  if(p.style==='pony')back=`<ellipse cx="59" cy="32" rx="5" ry="10" fill="${hc}"/>`;
  const top={short:`<path d="M23 37q1-20 17-20t17 20q-5-10-17-10t-17 10z" fill="${hc}"/>`,messy:`<path d="M23 35l2-12 5 4 3-9 5 7 5-8 3 8 6-5 1 9 4 6q-7-8-17-8t-17 8z" fill="${hc}"/>`,
    pony:`<path d="M23 37q1-20 17-20t17 20q-6-11-17-11t-17 11z" fill="${hc}"/>`,long:`<path d="M23 36q4-14 17-14t17 14q-8-7-17-7t-17 7z" fill="${hc}"/>`,
    bun:`<circle cx="40" cy="17" r="6" fill="${hc}"/><path d="M23 37q1-19 17-19t17 19q-6-10-17-10t-17 10z" fill="${hc}"/>`,none:''}[p.style||'short'];
  let cloth=`<path d="M8 80q3-21 32-23t32 23z" fill="${p.cloth||'#445'}"/>`;
  if(p.collar)cloth+=`<path d="M33 57l7 9 7-9" fill="${p.collar}"/>`;
  if(p.tie)cloth+=`<path d="M38.5 60h3l1.5 14-3 3-3-3z" fill="${p.tie}"/>`;
  if(p.glasses)acc+=`<g fill="none" stroke="#2a2a2a" stroke-width="1.4"><circle cx="33" cy="38" r="5"/><circle cx="47" cy="38" r="5"/><path d="M38 38h4"/></g>`;
  if(p.mask)acc+=`<path d="M26 42q14-3 28 0l-1 9q-13 7-26 0z" fill="${p.mask}"/>`;
  if(p.cap)acc+=`<path d="M22 31q2-15 18-15t18 15z" fill="${p.cap}"/><rect x="20" y="29" width="40" height="5" rx="2.5" fill="${p.cap}" opacity=".85"/>`;
  if(p.phones)acc+=`<path d="M22 36q0-22 18-22t18 22" stroke="#1a1a1a" stroke-width="3.4" fill="none"/><rect x="18" y="32" width="7" height="12" rx="3" fill="#1a1a1a"/><rect x="55" y="32" width="7" height="12" rx="3" fill="#1a1a1a"/>`;
  if(p.hood)acc+=`<path d="M17 52q-2-38 23-39 25 1 23 39h-6q2-28-17-29-19 1-17 29z" fill="${p.hood}"/>`;
  return `<svg viewBox="0 0 80 80" aria-hidden="true">${back}${cloth}<rect x="35" y="50" width="10" height="9" fill="${sk}"/><ellipse cx="40" cy="38" rx="16.5" ry="18.5" fill="${sk}"/><circle cx="29" cy="44" r="2.6" fill="#e89a8a" opacity="${f==='h'?.5:.18}"/><circle cx="51" cy="44" r="2.6" fill="#e89a8a" opacity="${f==='h'?.5:.18}"/>${FACES[f]||FACES.n}${top}${acc}</svg>`;
}
const CH={
 me:{style:'short',hair:'#1a1620',cloth:'#2a3550',collar:'#e6e2d8'},
 xy:{style:'pony',hair:'#151012',cloth:'#e6e2d8',collar:'#3a5a8a'},
 mom:{style:'long',hair:'#3a2a24',cloth:'#7a5a6a',skin:'#ecc4a4'},
 xk:{style:'messy',hair:'#2a2420',cloth:'#3b6ea5'},
 yq:{style:'pony',hair:'#151012',cloth:'#e6e2d8',collar:'#2a3550'},
 teacher:{style:'short',hair:'#3a3a3a',cloth:'#6b7b8c',collar:'#e6e2d8',tie:'#5a2a2a',glasses:true,skin:'#e8c7a8'},
 rt:{style:'long',hair:'#1a1210',cloth:'#e8c43a',hood:'#e8c43a'},
 kevin:{style:'messy',hair:'#3a2a20',cloth:'#4a3a6a',phones:true},
 hat:{style:'none',cap:'#111',cloth:'#1c1c1c',mask:'#d9dde0'},
 an:{style:'short',hair:'#1a1620',cloth:'#2a3550',collar:'#e6e2d8',glasses:true},
 qq:{style:'long',hair:'#2a1a14',cloth:'#e6e2d8',collar:'#8a3a5a'},
 dm:{style:'messy',hair:'#111',cloth:'#c94a3a',skin:'#e0b48e'},
 yoru:{style:'short',hair:'#3a1a34',cloth:'#2a2a3a',hood:'#5a2a4a'},
 xg2:{style:'long',hair:'#1a1416',cloth:'#2a3a5a',skin:'#ecc8a8'},
 bao:{style:'none',cap:'#ff9a5a',cloth:'#1c1c1c',hood:'#2a2a2a'},
 zhe:{style:'short',hair:'#16110e',cloth:'#2f5a3c',collar:'#d8d0b8'},
 mi:{style:'pony',hair:'#2a1a14',cloth:'#b8463a'},
 hu:{style:'messy',hair:'#1a1410',cloth:'#3a5a8a',skin:'#e6b892'},
 ting:{style:'long',hair:'#1a1210',cloth:'#6a4a8a'},
 xj:{style:'short',hair:'#1a1416',cloth:'#e6e2d8',collar:'#2a3550'},
 momn:{style:'bun',hair:'#2a2220',cloth:'#7a7a80',skin:'#ecc8a8'},
 py:{style:'long',hair:'#1a1210',cloth:'#e6e2d8',collar:'#2a3550',glasses:true},
 bh:{style:'messy',hair:'#111',cloth:'#c8322a'},
 xiu:{style:'pony',hair:'#151012',cloth:'#f0c83a',hood:'#f0c83a',skin:'#ece4d8'},
 kui:{style:'long',hair:'#1a1210',cloth:'#e6e2d8',collar:'#2a5a8a'},
 da:{style:'messy',hair:'#111',cloth:'#e6e2d8',collar:'#2a5a8a',skin:'#e0b48e'},
 ming:{style:'messy',hair:'#111',cloth:'#e6e2d8',collar:'#3a5a8a',skin:'#e0b48e'},
 yu8:{style:'short',hair:'#1a1416',cloth:'#e6e2d8',collar:'#3a5a8a',glasses:true},
 sil:{sil:true}
};

/* ---------- vertical scenes (360 \u00d7 640) ---------- */
const BG={
 radio:()=>`<rect width="360" height="640" fill="#141a26"/><rect x="200" y="90" width="120" height="150" fill="#0a0f18" stroke="#2c3548" stroke-width="8"/><line x1="260" y1="90" x2="260" y2="240" stroke="#2c3548" stroke-width="5"/><circle cx="292" cy="128" r="18" fill="#ebe0c6" opacity=".55"/><polygon points="200,240 320,240 300,640 60,640" fill="#ebe0c6" opacity=".05"/><rect y="430" width="360" height="210" fill="#0d1018"/><rect x="30" y="404" width="300" height="34" fill="#2a1d14"/><rect x="70" y="296" width="220" height="112" rx="14" fill="#3b2a1f"/><rect x="88" y="314" width="184" height="40" rx="4" fill="#ebe0c6"/><rect x="176" y="314" width="3" height="40" fill="#ff5a4c"/><circle cx="262" cy="382" r="9" fill="#ff5a4c"/><circle cx="262" cy="382" r="28" fill="#ff5a4c" opacity=".22"/><text x="90" y="390" font-family="monospace" font-size="18" fill="#f2ab4c">96.3</text>`,
 classroom:()=>`<rect width="360" height="640" fill="#141b21"/><rect x="40" y="70" width="280" height="120" fill="#1f3128" stroke="#4a3a2a" stroke-width="8"/><text x="300" y="176" font-size="14" fill="#ebe0c6" opacity=".35" text-anchor="end" font-family="serif">\u503c\u65e5\u751f\u3000\u6797\u5c0f\u96e8</text><rect x="90" y="24" width="180" height="6" fill="#dfe8f0" opacity=".8"/><rect x="40" y="20" width="280" height="90" fill="#dfe8f0" opacity=".04"/>${R(4,r=>R(3,c=>{const y=290+r*86,w=64+r*16,x=180+(c-1)*(w+24+r*6)-w/2;return `<polygon points="${x+5},${y} ${x+w-5},${y} ${x+w},${y+22} ${x},${y+22}" fill="#262f3a"/><rect x="${x+6}" y="${y+22}" width="4" height="${22+r*6}" fill="#262f3a"/><rect x="${x+w-10}" y="${y+22}" width="4" height="${22+r*6}" fill="#262f3a"/>`}))}<rect x="150" y="548" width="80" height="22" fill="#f2ab4c" opacity=".14"/>`,
 tower:()=>`<rect width="360" height="640" fill="#0e1120"/><circle cx="180" cy="250" r="130" fill="#1a2030" stroke="#2c3548" stroke-width="10"/>${R(12,i=>`<rect x="177" y="128" width="6" height="18" fill="#3a4560" transform="rotate(${i*30} 180 250)"/>`)}<line x1="180" y1="250" x2="180" y2="190" stroke="#4a5570" stroke-width="10" stroke-linecap="round" transform="rotate(110 180 250)"/><line x1="180" y1="250" x2="180" y2="150" stroke="#4a5570" stroke-width="6" stroke-linecap="round" transform="rotate(240 180 250)"/><rect x="120" y="470" width="120" height="70" rx="6" fill="#5a4232"/><rect x="120" y="470" width="120" height="16" fill="#7a5a42"/><rect y="560" width="360" height="80" fill="#08090f"/>`,
 ryokan:()=>`<rect width="360" height="640" fill="#0b0f16"/><polygon points="0,300 90,210 170,260 260,190 360,250 360,640 0,640" fill="#10151e"/><polygon points="40,380 180,300 320,380" fill="#151a24"/><rect x="58" y="378" width="244" height="190" fill="#181d28"/>${R(3,i=>`<rect x="${80+i*76}" y="410" width="44" height="40" fill="${i===2?'#ff4a3d':'#232a38'}" opacity="${i===2?.85:1}"/><rect x="${80+i*76}" y="480" width="44" height="40" fill="#232a38"/>`)}<rect x="156" y="500" width="48" height="68" fill="#07090d"/><rect x="110" y="346" width="140" height="28" fill="#2a241b"/><text x="180" y="367" text-anchor="middle" font-family="serif" font-size="18" font-weight="700" fill="#f2d39a">\u96f2\u9802\u65c5\u793e</text><rect y="568" width="360" height="72" fill="#07090d"/><circle cx="70" cy="600" r="6" fill="#fff3c8" opacity=".9"/><circle cx="110" cy="600" r="6" fill="#fff3c8" opacity=".9"/>`,
 rules:()=>`<rect width="360" height="640" fill="#120f0c"/><g transform="rotate(-4 180 320)"><rect x="40" y="110" width="280" height="420" fill="#e4d9bf"/><text x="180" y="160" text-anchor="middle" font-family="serif" font-size="24" font-weight="900" fill="#2a241b" letter-spacing="6">\u4f4f\u5bbf\u9808\u77e5</text>${R(9,i=>`<text x="62" y="${206+i*36}" font-family="monospace" font-size="13" fill="${i>=6?'#b8322a':'#2a241b'}" opacity=".7">${i+1}</text><rect x="84" y="${196+i*36}" width="${150+(i*37)%70}" height="7" fill="${i>=6?'#b8322a':'#2a241b'}" opacity="${i>=6?.85:.5}"/>`)}</g>`,
 door:()=>`<rect width="360" height="640" fill="#17140f"/><rect x="80" y="80" width="200" height="500" fill="#3b2a1f" stroke="#24180f" stroke-width="8"/><rect x="104" y="110" width="152" height="200" fill="#33241a"/><rect x="104" y="340" width="152" height="200" fill="#33241a"/><circle cx="250" cy="330" r="9" fill="#c9b39a"/><text x="180" y="70" text-anchor="middle" font-family="monospace" font-size="20" fill="#c9b39a" opacity=".6">203</text><rect x="80" y="576" width="200" height="10" fill="#e8d9a8"/><rect x="128" y="576" width="40" height="10" fill="#0a0806"/><rect x="190" y="576" width="40" height="10" fill="#0a0806"/><rect y="586" width="360" height="54" fill="#0d0b08"/>`,
 corridor:()=>`<rect width="360" height="640" fill="#0f1218"/><polygon points="0,0 140,240 140,400 0,640" fill="#151a22"/><polygon points="360,0 220,240 220,400 360,640" fill="#151a22"/><polygon points="0,640 140,400 220,400 360,640" fill="#0c0f14"/><rect x="140" y="240" width="80" height="160" fill="#06080b"/><rect x="164" y="40" width="32" height="5" fill="#dfe8f0" opacity=".7"/><ellipse cx="180" cy="320" rx="9" ry="11" fill="#0a0c10"/><rect x="169" y="331" width="22" height="44" rx="5" fill="#8a1f18"/><rect x="172" y="374" width="6" height="22" fill="#0a0c10"/><rect x="182" y="374" width="6" height="22" fill="#0a0c10"/><rect x="190" y="334" width="5" height="18" fill="#0a0c10" transform="rotate(-30 190 334)"/>`,
 mirror:()=>`<rect width="360" height="640" fill="#0e1512"/><rect x="60" y="80" width="240" height="460" rx="120" fill="#1b2420" stroke="#6b7b72" stroke-width="10"/><rect x="72" y="92" width="216" height="436" rx="108" fill="#111814"/><path d="M110 528q8-120 64-130 56 10 64 130z" fill="#050707"/><ellipse cx="174" cy="350" rx="34" ry="40" fill="#050707"/><path d="M190 528q8-140 54-150 30 6 38 150z" fill="#1a1414" opacity=".9"/><ellipse cx="236" cy="330" rx="26" ry="32" fill="#1a1414" opacity=".9"/><rect x="150" y="402" width="74" height="14" rx="7" fill="#1a1414" opacity=".9"/><circle cx="228" cy="326" r="3" fill="#ff3b30"/><circle cx="244" cy="326" r="3" fill="#ff3b30"/>`,
 elevator:()=>`<rect width="360" height="640" fill="#1b1d20"/><rect x="110" y="120" width="140" height="400" rx="10" fill="#2a2d32" stroke="#4a4e55" stroke-width="4"/>${[1,2,3,4].map((n,i)=>`<circle cx="180" cy="${450-i*86}" r="28" fill="${n===4?'#ff3b30':'#16181b'}" stroke="#55595f" stroke-width="3"/><text x="180" y="${460-i*86}" text-anchor="middle" font-family="monospace" font-size="28" fill="${n===4?'#fff':'#55595f'}">${n}</text>`).join('')}<circle cx="180" cy="192" r="60" fill="#ff3b30" opacity=".2"/>`,
 platform:()=>`<rect width="360" height="640" fill="#18221f"/><rect width="360" height="40" fill="#e8f2f2" opacity=".1"/><rect x="90" y="80" width="180" height="40" rx="4" fill="#2fb3a3"/><text x="180" y="108" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="700" fill="#04201c">\u5317\u5dba \u7d42\u9ede\u7ad9</text><rect x="110" y="132" width="140" height="22" fill="#000"/><text x="180" y="148" text-anchor="middle" font-family="monospace" font-size="13" fill="#f0b44c">\u672b\u73ed\u8eca 23:38</text><rect x="-20" y="250" width="400" height="230" rx="16" fill="#5a6a72"/>${R(5,i=>`<rect x="${10+i*72}" y="280" width="54" height="80" rx="4" fill="#0c1013"/>`)}<rect x="-20" y="430" width="400" height="10" fill="#2fb3a3"/><rect y="490" width="360" height="12" fill="#f0b44c" opacity=".85"/><rect y="502" width="360" height="138" fill="#2a3439"/>`,
 blackout:()=>`<rect width="360" height="640" fill="#050607"/><rect x="20" y="140" width="130" height="110" rx="10" fill="#020304" stroke="#1a2329" stroke-width="5"/><rect x="210" y="140" width="130" height="110" rx="10" fill="#020304" stroke="#1a2329" stroke-width="5"/><circle cx="320" cy="60" r="10" fill="#e2574c"/><circle cx="320" cy="60" r="60" fill="#e2574c" opacity=".14"/>${R(4,i=>`<path d="M${40+i*80} 640 q4-120 30-130 26 10 30 130z" fill="#0b0e10"/><ellipse cx="${70+i*80}" cy="490" rx="20" ry="24" fill="#0b0e10"/>`)}<text x="180" y="380" text-anchor="middle" font-family="monospace" font-size="64" fill="#e2574c" opacity=".9">00:40</text>`,
 seat:()=>`<rect width="360" height="640" fill="#1d2a31"/><rect y="0" width="360" height="40" fill="#e8f2f2" opacity=".15"/><rect x="20" y="120" width="320" height="140" rx="12" fill="#05080a" stroke="#3b4b55" stroke-width="5"/><rect x="0" y="330" width="360" height="90" rx="10" fill="#2f6f68"/><rect x="0" y="300" width="360" height="40" rx="8" fill="#3a8a80"/><rect x="230" y="318" width="34" height="20" rx="3" fill="#0a0e12" stroke="#444" stroke-width="2"/><rect x="234" y="321" width="26" height="14" fill="#9ec3f0"/><circle cx="247" cy="328" r="30" fill="#9ec3f0" opacity=".2"/><rect y="420" width="360" height="220" fill="#06090b"/><rect x="100" y="470" width="130" height="50" rx="8" fill="#e8c43a"/><rect x="100" y="480" width="130" height="6" fill="#c9a42a"/><rect x="100" y="500" width="130" height="6" fill="#c9a42a"/><polygon points="40,640 160,460 200,460 330,640" fill="#fff3c8" opacity=".08"/>`,
 traincar:()=>`<rect width="360" height="640" fill="#1d2a31"/><polygon points="0,0 130,200 130,420 0,640" fill="#22343c"/><polygon points="360,0 230,200 230,420 360,640" fill="#22343c"/><rect x="130" y="200" width="100" height="220" fill="#24313a" stroke="#41525d" stroke-width="3"/><rect x="178" y="200" width="4" height="220" fill="#41525d"/>${R(3,i=>`<rect x="${70+i*110}" y="0" width="5" height="640" fill="#9aa7ae" opacity=".55"/>`)}<polygon points="0,640 130,420 230,420 360,640" fill="#2a3238"/><path d="M40 640 q4-110 30-120 26 10 30 120z" fill="#121a1f"/><ellipse cx="70" cy="500" rx="20" ry="24" fill="#121a1f"/>`,
 board:()=>`<rect width="360" height="640" fill="#1d1a2a"/><rect x="30" y="110" width="300" height="400" fill="#5a4030"/><rect x="54" y="140" width="252" height="340" fill="#ece4cf" transform="rotate(-2 180 310)"/><text x="180" y="186" text-anchor="middle" font-family="serif" font-size="22" font-weight="900" fill="#2c2620">\u4e03\u5927\u4e0d\u53ef\u601d\u8b70</text>${R(6,i=>`<rect x="80" y="${212+i*36}" width="${140+(i*29)%60}" height="8" fill="#2c2620" opacity=".55"/>`)}<text x="80" y="450" font-family="serif" font-size="22" font-weight="700" fill="#b8322a">\u4e03\u3001\uff1f\uff1f\uff1f</text><circle cx="296" cy="134" r="8" fill="#b48ef0"/>`,
 piano:()=>`<rect width="360" height="640" fill="#0f0d18"/><rect x="200" y="70" width="120" height="140" fill="#0c0e1c" stroke="#3a3350" stroke-width="7"/><circle cx="286" cy="110" r="14" fill="#ece4cf" opacity=".5"/><polygon points="200,210 320,210 360,640 150,640" fill="#ece4cf" opacity=".05"/><path d="M30 520 L30 360 Q30 300 120 300 L270 300 Q320 300 330 360 L340 520Z" fill="#050409"/><rect x="30" y="440" width="310" height="22" fill="#0c0b12"/>${R(18,i=>`<rect x="${34+i*17}" y="442" width="15" height="18" fill="#d8d2c6" opacity="${i===9?.95:.4}"/>`)}${R(4,i=>`<text x="${60+i*60}" y="${250-i*20}" font-size="22" fill="#ece4cf" opacity=".18">\u266a</text>`)}`,
 painting:()=>`<rect width="360" height="640" fill="#18141f"/><rect x="70" y="110" width="220" height="290" fill="#2a2433" stroke="#6b4a2a" stroke-width="16"/><ellipse cx="180" cy="230" rx="56" ry="68" fill="#b89e7c"/><path d="M124 200 Q180 140 236 200 Q218 168 180 168 Q142 168 124 200Z" fill="#3a3a3a"/><ellipse cx="158" cy="232" rx="13" ry="7" fill="#fff"/><ellipse cx="202" cy="232" rx="13" ry="7" fill="#fff"/><circle cx="151" cy="232" r="5" fill="#1a1410"/><circle cx="195" cy="232" r="5" fill="#1a1410"/><path d="M160 272 Q180 280 200 272" stroke="#6a4a3a" stroke-width="3" fill="none"/><path d="M90 400 Q180 320 270 400Z" fill="#1d1a24"/><rect y="520" width="360" height="120" fill="#100d16"/>`,
 chairs:()=>`<rect width="360" height="640" fill="#231c30"/><rect x="220" y="70" width="110" height="110" fill="#0c0e1c" stroke="#3a3350" stroke-width="6"/><rect y="470" width="360" height="170" fill="#1a1524"/>${R(6,i=>{const x=22+i*54,red=i===5;return `<g opacity="${red?1:.9}"><rect x="${x}" y="340" width="40" height="44" fill="none" stroke="${red?'#ef5b6b':'#8a7a9a'}" stroke-width="5"/><rect x="${x}" y="384" width="40" height="8" fill="${red?'#ef5b6b':'#8a7a9a'}"/><rect x="${x}" y="392" width="5" height="60" fill="${red?'#ef5b6b':'#8a7a9a'}"/><rect x="${x+35}" y="392" width="5" height="60" fill="${red?'#ef5b6b':'#8a7a9a'}"/></g>${red?`<circle cx="${x+20}" cy="390" r="46" fill="#ef5b6b" opacity=".16"/>`:''}`})}`,
 lgate:()=>`<rect width="360" height="640" fill="#0d0a14"/><circle cx="280" cy="110" r="34" fill="#ebe0c6" opacity=".35"/><path d="M40 600V250q140-120 280 0v350" fill="none" stroke="#3a2f58" stroke-width="14"/><text x="180" y="230" text-anchor="middle" font-family="serif" font-size="30" font-weight="900" fill="#f6c35a" opacity=".55" letter-spacing="6">\u661f\u5149\u6a02\u5712</text>${R(9,i=>`<rect x="${60+i*28}" y="300" width="6" height="300" fill="#241c38"/>`)}<rect x="150" y="420" width="60" height="44" rx="6" fill="#1a1426" stroke="#f6c35a" stroke-width="3"/><text x="180" y="448" text-anchor="middle" font-family="monospace" font-size="16" fill="#f6c35a">0000</text><polygon points="180,640 120,300 240,300" fill="#ebe0c6" opacity=".05"/><rect x="16" y="20" width="58" height="22" rx="4" fill="#ff3d7f"/><text x="45" y="36" text-anchor="middle" font-family="monospace" font-size="13" font-weight="700" fill="#fff">LIVE</text><text x="344" y="36" text-anchor="end" font-family="monospace" font-size="13" fill="#ebe0c6">\u25cf 6,230</text>`,
 lcarousel:()=>`<rect width="360" height="640" fill="#120c18"/><polygon points="40,250 180,150 320,250" fill="#3a1f3a"/><rect x="40" y="250" width="280" height="22" fill="#5a2a4a"/>${R(10,i=>`<circle cx="${50+i*29}" cy="261" r="6" fill="#f6c35a" opacity="${i%3?.9:.35}"/>`)}${R(4,i=>`<rect x="${78+i*68}" y="272" width="4" height="200" fill="#8a7656"/><path d="M${62+i*68} ${400+(i%2)*30}q18-26 36 0v18h-36z" fill="#d8d2c6" opacity=".7"/>`)}<ellipse cx="180" cy="490" rx="160" ry="24" fill="#1e1424"/><path d="M230 540l40 30-60 6z" fill="#d8d2c6" opacity=".6"/><rect x="16" y="20" width="58" height="22" rx="4" fill="#ff3d7f"/><text x="45" y="36" text-anchor="middle" font-family="monospace" font-size="13" font-weight="700" fill="#fff">LIVE</text><text x="344" y="36" text-anchor="end" font-family="monospace" font-size="13" fill="#ebe0c6">\u25cf 6,230</text>`,
 lmirror:()=>`<rect width="360" height="640" fill="#0c1014"/>${R(5,i=>`<rect x="${10+i*70}" y="120" width="60" height="400" rx="6" fill="#1a2228" stroke="#6b7b82" stroke-width="3"/><ellipse cx="${40+i*70}" cy="300" rx="12" ry="15" fill="#e8e2d6" opacity="${i===2?.5:.12}"/>`)}<text x="180" y="90" text-anchor="middle" font-family="serif" font-size="26" font-weight="900" fill="#95a1b7" opacity=".6" letter-spacing="20">\u93e1\u3000\u5bae</text><text x="180" y="580" text-anchor="middle" font-size="30" fill="#ff3d7f" opacity=".8" letter-spacing="10">\u2190 \u2191 \u2190 \u2192 \u2191</text><rect x="16" y="20" width="58" height="22" rx="4" fill="#ff3d7f"/><text x="45" y="36" text-anchor="middle" font-family="monospace" font-size="13" font-weight="700" fill="#fff">LIVE</text><text x="344" y="36" text-anchor="end" font-family="monospace" font-size="13" fill="#ebe0c6">\u25cf 6,230</text>`,
 lchat:()=>`<rect width="360" height="640" fill="#0e0a16"/><rect x="0" y="0" width="360" height="56" fill="#1a1426"/><text x="18" y="35" font-family="sans-serif" font-size="15" font-weight="700" fill="#ebe0c6">\u804a\u5929\u5ba4 \u00b7 \u7ba1\u7406\u54e1 \u591c\u8c93</text>${[['\u9e79\u9165\u96de\u914d\u5976\u8336','\u4f86\u4e86\u4f86\u4e86\uff01\uff01','#9ad'],['\u963f\u8c79\u5728\u9019','7 \u865f\u8eca\u5ec2 \u885d\u554a','#fa5'],['\u661f\u5149\u6a02\u5712\u5b98\u65b9','\u4e3b\u64a5\u5feb\u53bb\u6469\u5929\u8f2a\uff01','#f6c35a'],['\u81bd\u5c0f\u9b3c007','\u54a6\uff1f\u6709\u5169\u500b\u7ba1\u7406\u54e1\uff1f','#9ad'],['\u7ba1\u7406\u54e1_\u591c\u63cf','\u7167\u93e1\u5b50\u88e1\u7684\u7bad\u982d\u8d70\u5c31\u5c0d\u4e86','#f6c35a'],['\u8def\u904e\u7684\u8c93','\uff08\u8cbc\u5716\uff09','#9ad'],['\u5c0f\u5149_0817','\u4e0d\u8981\u53bb\u3002','#ff3d7f']].map((m,i)=>`<rect x="14" y="${80+i*74}" width="${i===6?332:300}" height="60" rx="10" fill="${i===6?'#3a0f22':'#1a1426'}" stroke="${i===6?'#ff3d7f':'none'}" stroke-width="2"/><text x="28" y="${104+i*74}" font-family="sans-serif" font-size="13" font-weight="700" fill="${m[2]}">${m[0]}</text><text x="28" y="${126+i*74}" font-family="sans-serif" font-size="15" fill="#ebe0c6">${m[1]}</text>`).join('')}`,
 lferris:()=>`<rect width="360" height="640" fill="#0b0814"/>${R(40,i=>`<circle cx="${(i*97)%360}" cy="${(i*53)%220}" r="1.2" fill="#fff" opacity=".5"/>`)}<circle cx="180" cy="300" r="140" fill="none" stroke="#3a2f58" stroke-width="5"/>${R(12,i=>{const a=i*Math.PI/6;const x=180+140*Math.cos(a),y=300+140*Math.sin(a);return `<line x1="180" y1="300" x2="${x}" y2="${y}" stroke="#2a2440" stroke-width="3"/><rect x="${x-13}" y="${y-8}" width="26" height="22" rx="5" fill="${i===4?'#ff3d7f':'#f6c35a'}" opacity="${i===4?1:.55}"/>`})}<path d="M180 300l-70 340M180 300l70 340" stroke="#2a2440" stroke-width="8"/><text x="${180+140*Math.cos(4*Math.PI/6)}" y="${307+140*Math.sin(4*Math.PI/6)}" text-anchor="middle" font-family="monospace" font-size="13" font-weight="700" fill="#fff">7</text><rect x="16" y="20" width="58" height="22" rx="4" fill="#ff3d7f"/><text x="45" y="36" text-anchor="middle" font-family="monospace" font-size="13" font-weight="700" fill="#fff">LIVE</text><text x="344" y="36" text-anchor="end" font-family="monospace" font-size="13" fill="#ebe0c6">\u25cf 6,230</text>`,
 lvod:()=>`<rect width="360" height="640" fill="#060509"/><rect x="20" y="160" width="320" height="180" rx="8" fill="#14101c"/><rect x="20" y="350" width="320" height="4" fill="#2a2440"/><rect x="20" y="350" width="230" height="4" fill="#ff3d7f"/><text x="20" y="380" font-family="monospace" font-size="13" fill="#95a1b7">00:47 / 01:02</text><rect x="20" y="410" width="320" height="70" rx="10" fill="#1a0f1c" stroke="#ff3d7f" stroke-width="2" opacity=".85"/><text x="36" y="438" font-family="sans-serif" font-size="13" font-weight="700" fill="#ff8ab0">\u5c0f\u5149_0817</text><text x="36" y="462" font-family="sans-serif" font-size="15" fill="#ebe0c6">\u8b1d\u8b1d\u4f60\u5011\uff0c\u966a\u6211\u770b\u661f\u661f\u3002</text><text x="180" y="130" text-anchor="middle" font-family="monospace" font-size="13" fill="#95a1b7" letter-spacing="3">\u76f4\u64ad\u56de\u653e</text>`,
 s7trail:()=>`<rect width="360" height="640" fill="#16231e"/><path d="M0 300 L80 170 L150 250 L230 120 L300 220 L360 170 V640 H0Z" fill="#1c3028"/><path d="M0 380 L70 320 L160 370 L240 310 L360 360 V640 H0Z" fill="#101a16"/><rect y="250" width="360" height="90" fill="#cfd8d2" opacity=".16"/><rect x="130" y="380" width="100" height="56" rx="4" fill="#5a4630"/><rect x="176" y="436" width="8" height="90" fill="#3a2c1e"/><text x="180" y="414" text-anchor="middle" font-family="serif" font-size="18" fill="#e8dcc0">\u9b3c\u6e56\u6b65\u9053</text>${R(7,i=>`<path d="M${i*56-10} 640 l28 -${180+(i%3)*60} 28 ${180+(i%3)*60}z" fill="#0a120e"/>`)}`,
 s7fog:()=>`<rect width="360" height="640" fill="#2a3530"/>${R(8,i=>`<rect x="${i*48}" y="${40+(i%3)*30}" width="${10+(i%2)*6}" height="600" fill="#1a2420" opacity="${.5+(i%3)*.15}"/>`)}<rect width="360" height="640" fill="#c8d2cc" opacity=".25"/><path d="M180 640 V420 M180 420 L90 330 M180 420 L270 330 M180 420 V300" stroke="#5a5040" stroke-width="26" stroke-linecap="round" opacity=".55"/><path d="M160 440 l40 30" stroke="#5a4630" stroke-width="16"/>`,
 s7hut:()=>`<rect width="360" height="640" fill="#0c0906"/><polygon points="20,220 180,120 340,220" fill="#1e1610"/><rect x="20" y="220" width="320" height="420" fill="#1a130c"/>${R(8,i=>`<rect x="${20+i*40}" y="220" width="2" height="420" fill="#0c0806"/>`)}<rect x="230" y="260" width="70" height="60" fill="#0a0e10" stroke="#3a2c1e" stroke-width="5"/><circle cx="130" cy="430" r="60" fill="#e8b04a" opacity=".12"/><rect x="118" y="410" width="24" height="32" rx="5" fill="#e8b04a" opacity=".75"/>`,
 s7count:()=>`<rect width="360" height="640" fill="#0c0906"/><circle cx="180" cy="200" r="120" fill="#e8b04a" opacity=".06"/>${R(7,i=>`<g><ellipse cx="${40+i*47}" cy="330" rx="16" ry="19" fill="${i===6?'#3a1410':'#1c2a24'}"/><path d="M${14+i*47} 430 q2-70 26-72 24 2 26 72z" fill="${i===6?'#3a1410':'#1c2a24'}"/><text x="${40+i*47}" y="290" text-anchor="middle" font-family="monospace" font-size="18" fill="${i===6?'#ff5a4a':'#e8b04a'}">${i+1}</text></g>`)}`,
 s7window:()=>`<rect width="360" height="640" fill="#050707"/><rect x="70" y="160" width="220" height="220" fill="#0a1214" stroke="#2a2018" stroke-width="16"/><path d="M180 160 V380 M70 270 H290" stroke="#2a2018" stroke-width="10"/><ellipse cx="225" cy="240" rx="38" ry="46" fill="#d6d2c4" opacity=".55"/><ellipse cx="212" cy="234" rx="8" ry="10" fill="#050404"/><ellipse cx="240" cy="234" rx="8" ry="10" fill="#050404"/><path d="M206 262 q19 14 38 0" stroke="#4a7a2a" stroke-width="5" fill="#2a1408"/><ellipse cx="120" cy="300" rx="20" ry="26" fill="#7a6446" opacity=".35"/>`,
 s7ridge:()=>`<defs><linearGradient id="s7g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3050"/><stop offset=".6" stop-color="#e88a5a"/><stop offset="1" stop-color="#f0c070"/></linearGradient></defs><rect width="360" height="640" fill="url(#s7g)"/><circle cx="260" cy="380" r="46" fill="#ffd890" opacity=".85"/><path d="M0 640 V420 L90 360 L170 400 L250 340 L360 390 V640Z" fill="#1c2a24"/><path d="M0 640 L60 560 L150 590 L240 550 L360 580 V640Z" fill="#0e1612"/>${R(4,i=>`<g opacity=".85"><ellipse cx="${40+i*26}" cy="${470-i*6}" rx="6" ry="7" fill="#050807"/><path d="M${32+i*26} ${500-i*6} q1-22 8-23 7 1 8 23z" fill="#050807"/></g>`)}`,
 s8desk:()=>`<rect width="360" height="640" fill="#0e0d14"/><rect y="400" width="360" height="240" fill="#2a2018"/><polygon points="220,180 340,180 380,420 180,420" fill="#f0d890" opacity=".12"/><path d="M250 120 h44 l-14 70 h-16z" fill="#3a3430"/><rect x="90" y="370" width="180" height="34" fill="#e8e2d6" transform="rotate(-4 180 387)"/><rect x="40" y="320" width="56" height="56" rx="10" fill="#e8a0b0"/><text x="68" y="354" text-anchor="middle" font-family="monospace" font-size="14" fill="#2a2420">23:59</text>`,
 s8class:()=>`<rect width="360" height="640" fill="#1a1c22"/><rect x="30" y="90" width="300" height="140" fill="#1f3128" stroke="#4a3a2a" stroke-width="8"/><text x="180" y="176" text-anchor="middle" font-family="serif" font-size="40" fill="#e8e2d6" opacity=".85">\u7b2c\u96f6\u7bc0</text><rect x="0" y="60" width="26" height="300" fill="#d8dcd8" opacity=".25"/>${R(4,r=>R(4,c=>`<circle cx="${60+c*80}" cy="${300+r*80}" r="18" fill="#4a4c54" opacity=".85"/><rect x="${36+c*80}" y="${322+r*80}" width="48" height="26" fill="#3a3024"/>`))}`,
 s8stairs:()=>`<rect width="360" height="640" fill="#16181c"/>${R(12,i=>`<rect x="${40+i*14}" y="${600-i*44}" width="${280-i*14}" height="44" fill="${i%2?'#2a2c32':'#24262c'}"/>`)}<rect x="250" y="60" width="70" height="46" fill="#2a3a5a"/><text x="285" y="92" text-anchor="middle" font-family="monospace" font-size="26" fill="#fff">4F</text><rect x="30" y="80" width="80" height="54" fill="#e8e2d6" opacity=".7"/><text x="70" y="113" text-anchor="middle" font-size="12" fill="#c83a2a">\u8003\u8a66\u52a0\u6cb9\uff01</text>`,
 s8mirror:()=>`<rect width="360" height="640" fill="#0a0c10"/><rect x="60" y="80" width="240" height="460" rx="10" fill="#1a2a34" stroke="#8a9aa2" stroke-width="10"/><ellipse cx="160" cy="260" rx="40" ry="50" fill="#e8e2d6" opacity=".35"/><path d="M90 540 q70-150 140 0" fill="#e8e2d6" opacity=".25"/><ellipse cx="240" cy="230" rx="34" ry="44" fill="#cfc8bc" opacity=".7"/><text x="240" y="246" text-anchor="middle" font-family="serif" font-size="44" font-weight="900" fill="#c8281e" opacity=".85">0</text><circle cx="240" cy="176" r="14" fill="#2a2220"/>`,
 h9gate:()=>`<rect width="360" height="640" fill="#2a1a20"/><rect y="460" width="360" height="180" fill="#3a2a22"/><rect x="50" y="170" width="260" height="300" fill="#1a1014" stroke="#5a3a2a" stroke-width="8"/><rect x="70" y="130" width="220" height="56" rx="6" fill="#c8322a"/><text x="180" y="168" text-anchor="middle" font-family="serif" font-size="26" font-weight="900" fill="#ffe6c8">\u516b\u5e74\u516b\u73ed \u9b3c\u5c4b</text><rect x="140" y="260" width="80" height="210" fill="#050304"/>${R(6,i=>`<circle cx="${40+i*56}" cy="${80+(i%2)*30}" r="16" fill="${['#ff7a3c','#ffd36a','#c8322a','#8fd3a6','#a8c4ff','#ff7a3c'][i]}" opacity=".85"/>`)}<ellipse cx="180" cy="520" rx="22" ry="28" fill="#f0c83a"/>`,
 h9coins:()=>`<rect width="360" height="640" fill="#22161a"/><rect x="60" y="300" width="240" height="160" rx="8" fill="#2a1a14" stroke="#8a6a4a" stroke-width="5"/>${R(18,i=>`<circle cx="${100+(i*37)%170}" cy="${340+(i*23)%100}" r="14" fill="#6a5a3a" stroke="#3a2a1a" stroke-width="3"/>`)}<rect x="230" y="200" width="80" height="56" rx="6" fill="#1a1a1a"/><text x="270" y="238" text-anchor="middle" font-family="monospace" font-size="26" fill="#ff7a3c">87</text>`,
 h9mirror:()=>`<rect width="360" height="640" fill="#0d0a0c"/><rect x="40" y="100" width="280" height="420" fill="#1a2228" stroke="#6b7b82" stroke-width="10"/><ellipse cx="120" cy="300" rx="30" ry="36" fill="#e8e2d6" opacity=".5"/><path d="M80 520 q40-120 80 0" fill="#e8e2d6" opacity=".35"/><ellipse cx="240" cy="300" rx="22" ry="28" fill="#f0c83a" opacity=".12"/><text x="180" y="580" text-anchor="middle" font-family="monospace" font-size="16" fill="#ff7a3c">CAM 3 \u00b7 \u93e1\u5b50\u623f</text>`,
 h9dark:()=>`<rect width="360" height="640" fill="#030203"/><rect x="140" y="60" width="80" height="30" rx="4" fill="#0f3a1a"/><text x="180" y="82" text-anchor="middle" font-family="monospace" font-size="16" fill="#5aff8a">EXIT</text><path d="M150 640 q30-300 30-360 q0 60 30 360z" fill="#1a0606"/><ellipse cx="180" cy="290" rx="34" ry="44" fill="#e8e2da" opacity=".85"/><path d="M146 270 q20-40 34-44 q20 4 34 44 q-20-24-34 40z" fill="#070506"/><circle cx="194" cy="286" r="5" fill="#ff2a2a"/>`,
 h9wardrobe:()=>`<rect width="360" height="640" fill="#1a120c"/>${R(5,i=>`<rect x="${10+i*70}" y="160" width="62" height="360" fill="${i===4?'#2a1e14':'#3a2a1a'}" stroke="#24180e" stroke-width="3"/><text x="${41+i*70}" y="150" text-anchor="middle" font-family="monospace" font-size="16" fill="#a8949a">${i+5}</text>`)}<rect x="290" y="168" width="46" height="344" fill="#050304"/><ellipse cx="313" cy="330" rx="16" ry="30" fill="#f0c83a" opacity=".8"/><path d="M286 300 l58 30 M286 330 l58 -30" stroke="#8a8a8a" stroke-width="2"/>`,
 l10class:()=>`<rect width="360" height="640" fill="#1c2026"/><line x1="180" y1="0" x2="180" y2="60" stroke="#888" stroke-width="3"/><ellipse cx="180" cy="62" rx="90" ry="8" fill="#9a9a9a"/><rect x="30" y="120" width="300" height="130" fill="#1f3128" stroke="#4a3a2a" stroke-width="8"/><text x="180" y="200" text-anchor="middle" font-family="serif" font-size="40" fill="#e8e2d6" opacity=".85">\u661f\u671f\u4e94</text>${R(4,r=>R(4,c=>`<rect x="${36+c*80}" y="${330+r*76}" width="50" height="26" fill="#3a3024"/><circle cx="${61+c*80}" cy="${318+r*76}" r="14" fill="#4a4c54" opacity=".85"/>`))}`,
 l10clock:()=>`<rect width="360" height="640" fill="#0b0e12"/><circle cx="180" cy="300" r="130" fill="#f4f0e6" stroke="#2a2420" stroke-width="10"/>${R(12,i=>{const a=i*Math.PI/6;return `<line x1="${180+110*Math.sin(a)}" y1="${300-110*Math.cos(a)}" x2="${180+122*Math.sin(a)}" y2="${300-122*Math.cos(a)}" stroke="#2a2420" stroke-width="4"/>`})}<line x1="180" y1="300" x2="180" y2="200" stroke="#c8402e" stroke-width="8" stroke-linecap="round"/><line x1="180" y1="300" x2="195" y2="236" stroke="#2a2420" stroke-width="10" stroke-linecap="round"/><text x="180" y="500" text-anchor="middle" font-family="monospace" font-size="40" fill="#ffd36a">12:10</text>`,
 l10tally:()=>`<rect width="360" height="640" fill="#e8e0cc"/><rect x="40" y="80" width="280" height="480" fill="#f4eedc" stroke="#c8b898" stroke-width="3"/>${R(10,i=>`<text x="${80+(i%3)*90}" y="${180+Math.floor(i/3)*100}" font-family="serif" font-size="64" fill="#2a2420">${i<9?'\u6b63':'\u4e05'}</text>`)}<text x="180" y="540" text-anchor="middle" font-family="serif" font-size="16" fill="#8a2a2a">\u9019\u6b21\u4e00\u5b9a\u8981\u8b93\u4ed6\u6c92\u4e8b\u3002</text>`,
 l10stairs:()=>`<rect width="360" height="640" fill="#16120e"/>${R(13,i=>`<rect x="${30+i*12}" y="${600-i*40}" width="${300-i*12}" height="40" fill="${i===12?'#c8402e':i%2?'#2e261e':'#28201a'}" opacity="${i===12?.75:1}"/>`)}<text x="320" y="70" text-anchor="end" font-family="monospace" font-size="30" fill="#c8402e">13</text>`,
 e11class:()=>`<rect width="360" height="640" fill="#22262c"/><rect x="30" y="110" width="300" height="140" fill="#1f3128" stroke="#4a3a2a" stroke-width="8"/><text x="180" y="170" text-anchor="middle" font-family="serif" font-size="22" fill="#e8e2d6" opacity=".8">10 \u6708 30 \u65e5\uff08\u4e94\uff09</text><text x="180" y="214" text-anchor="middle" font-family="serif" font-size="30" fill="#e8e2d6" opacity=".85">\u7b2c\u516b\u7bc0</text><circle cx="300" cy="60" r="34" fill="#f4f0e6" stroke="#2a2420" stroke-width="5"/><line x1="300" y1="60" x2="296" y2="36" stroke="#2a2420" stroke-width="4"/><line x1="300" y1="60" x2="322" y2="60" stroke="#2a2420" stroke-width="5"/>${R(4,r=>R(4,c=>`<rect x="${36+c*80}" y="${330+r*76}" width="50" height="26" fill="#3a3024"/><circle cx="${61+c*80}" cy="${318+r*76}" r="14" fill="#4a4c54" opacity=".85"/>`))}`,
 e11clock:()=>`<rect width="360" height="640" fill="#0a0d10"/><circle cx="180" cy="300" r="130" fill="#f4f0e6" stroke="#2a2420" stroke-width="10"/><line x1="180" y1="300" x2="172" y2="186" stroke="#2a2420" stroke-width="8" stroke-linecap="round"/><line x1="180" y1="300" x2="270" y2="300" stroke="#2a2420" stroke-width="12" stroke-linecap="round"/><text x="180" y="500" text-anchor="middle" font-family="monospace" font-size="44" fill="#5ae0ff">17:29</text>`,
 e11window:()=>`<rect width="360" height="640" fill="#03050a"/><rect x="50" y="140" width="260" height="300" fill="#0a1218" stroke="#3a3a3a" stroke-width="14"/><path d="M180 140 V440 M50 290 H310" stroke="#3a3a3a" stroke-width="8"/><ellipse cx="230" cy="250" rx="46" ry="56" fill="#bfe8ff" opacity=".55"/><ellipse cx="214" cy="244" rx="12" ry="14" fill="#fff"/><ellipse cx="246" cy="244" rx="12" ry="14" fill="#fff"/><circle cx="214" cy="247" r="7" fill="#0a1420"/><circle cx="246" cy="247" r="7" fill="#0a1420"/>`,
 e11museum:()=>`<rect width="360" height="640" fill="#e8eef2"/><rect y="500" width="360" height="140" fill="#d0dae2"/>${R(2,i=>`<rect x="${20+i*170}" y="160" width="150" height="320" fill="#bccad6" opacity=".6" stroke="#9aaebe" stroke-width="4"/><rect x="${36+i*170}" y="340" width="118" height="110" fill="${['#3a5a8a','#c8402e'][i]}" opacity=".45"/>`)}<rect x="0" y="560" width="360" height="10" fill="#5ae08a" opacity=".6"/><text x="180" y="120" text-anchor="middle" font-family="monospace" font-size="18" fill="#3a4a5a">\u5c55\u54c1 No.0902</text>`,
 e11dawn:()=>`<defs><linearGradient id="e11g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ab8e8"/><stop offset=".7" stop-color="#f0d8b0"/><stop offset="1" stop-color="#ffe8c0"/></linearGradient></defs><rect width="360" height="640" fill="url(#e11g)"/><rect y="460" width="360" height="180" fill="#c8d4dc"/><rect x="130" y="300" width="100" height="160" fill="#fff8e0"/><circle cx="180" cy="200" r="50" fill="#fff8e0" opacity=".8"/>`,
 locked:()=>`<rect width="360" height="640" fill="#1a120c"/><rect x="50" y="160" width="260" height="240" rx="10" fill="#3b2a1f" stroke="#5a4232" stroke-width="8"/><rect x="50" y="160" width="260" height="56" fill="#4a3424"/><rect x="160" y="250" width="40" height="56" rx="8" fill="#140d08"/><circle cx="180" cy="272" r="7" fill="#ff4a4a"/><circle cx="180" cy="272" r="22" fill="#ff4a4a" opacity=".25"/><path d="M0 120 L360 460 M0 460 L360 120" stroke="#8a8a92" stroke-width="10" stroke-dasharray="18 8" opacity=".55"/>`
};
const bgSVG=k=>`<svg viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${(BG[k]||BG.locked)()}</svg>`;

/* ---------- per-story data ---------- */
const DATA={
 '1996':{acc:'#f2ab4c',tagline:'\u8de8\u8d8a 30 \u5e74\u7684\u6c42\u6551\u8a0a\u865f',tags:['\u61f8\u7591','\u6642\u7a7a','\u9748\u7570\u96fb\u6ce2'],
  poster:{bg:'radio',img:'v/1996_poster.jpg',chars:[]},
  eps:[['\u5ee3\u64ad\u5ba4','23:00\uff0c\u6536\u97f3\u6a5f\u81ea\u5df1\u4eae\u4e86'],['\u5716\u66f8\u9928','\u5979\u7684\u501f\u66f8\u5361\uff0c\u65e5\u671f\u662f\u901a\u8a71\u7684\u9694\u5929'],['\u6559\u5ba4','\u70cf\u9d09\u3001\u5bc6\u78bc\u8f2a\uff0c\u548c\u523b\u5728\u684c\u5e95\u7684\u5b57'],['\u9418\u6a13','\u56db\u500b\u5927\u4eba\u88e1\uff0c\u6709\u4e00\u500b\u5728\u8aaa\u8b0a'],['\u5929\u53f0','\u6700\u5f8c\u4e00\u6b21\u901a\u8a0a\uff0c\u5979\u8aaa\u51fa\u4e86\u540d\u5b57']],
  shots:[
   {bg:'radio',fx:'dust',cap:['\u6bcf\u665a 11 \u9ede\uff0c','\u9019\u53f0\u6536\u97f3\u6a5f\u90fd\u6703[\u81ea\u5df1\u6253\u958b]\u3002']},
   {bg:'radio',fx:'redpulse',chars:[{c:'xy',f:'s',pos:'c',ghost:true}],cap:['\u8a0a\u865f\u7684\u53e6\u4e00\u982d\uff0c','\u662f\u4e00\u500b\u5973\u751f\u5728[\u6c42\u6551]\u3002']},
   {bg:'classroom',chars:[{c:'xy',f:'t',pos:'c'}],who:'\u6797\u5c0f\u96e8',cap:['\u300c\u6211\u5728 1996 \u5e74\u3002\u300d','\u300c\u5b78\u6821\u2026\u2026[\u5c31\u5feb\u8981\u6d88\u5931\u4e86]\u3002\u300d']},
   {bg:'tower',fx:'flicker',chars:[{c:'me',f:'shock',pos:'c'}],cap:['\u4e09\u5341\u5e74\u524d\u7559\u4e0b\u7684\u7dda\u7d22\uff0c','\u5168\u90fd\u6307\u5411[\u540c\u4e00\u500b\u4eba]\u3002']},
   {bg:'classroom',fx:'flash',chars:[{c:'mom',f:'t',pos:'c'}],cap:['\u7576\u5abd\u5abd\u770b\u898b\u9019\u53f0\u6536\u97f3\u6a5f\u2014\u2014','\u5979[\u54ed\u4e86]\u3002']}]},
 'yunding':{acc:'#ff4a4a',tagline:'\u9055\u53cd\u4e00\u689d\uff0c\u4f60\u5c31\u56de\u4e0d\u53bb\u4e86',tags:['\u898f\u5247\u602a\u8ac7','\u6703\u6b7b\u4ea1','\u591a\u7d50\u5c40'],
  poster:{bg:'ryokan',chars:[{c:'sil',f:'n',x:96,y:120,s:170,glow:true},{c:'yq',f:'a',x:-10,y:250,s:150},{c:'xk',f:'s',x:220,y:255,s:150}]},
  eps:[['\u5165\u4f4f','\u4e5d\u689d\u898f\u5247\uff0c\u56db\u689d\u662f\u5047\u7684'],['\u7b2c\u4e00\u591c','\u5ba4\u53cb\u4e0d\u898b\u4e86\uff0c\u88ab\u5b50\u537b\u647a\u597d\u4e86'],['\u505c\u96fb','\u9ed1\u6697\u88e1\uff0c\u6709\u4eba\u53eb\u4f60\u7684\u540d\u5b57'],['\u4e0d\u5b58\u5728\u7684\u56db\u6a13','\u96fb\u68af\u505c\u5728\u4e86 4'],['\u5929\u4eae\u4e4b\u524d','22 \u5206\u9418\uff0c\u6551\u56de\u6240\u6709\u4eba']],
  shots:[
   {bg:'ryokan',fx:'rain',cap:['\u98b1\u98a8\u591c\uff0c\u5168\u73ed\u88ab\u56f0\u9032','\u4e00\u9593[\u5ee2\u68c4 40 \u5e74]\u7684\u65c5\u793e\u3002']},
   {bg:'rules',fx:'redpulse',cap:['\u6ac3\u53f0\u7559\u8457 9 \u689d\u898f\u5247\u3002','\u5176\u4e2d 4 \u689d\uff0c[\u662f\u5047\u7684]\u3002']},
   {bg:'door',fx:'knock',chars:[{c:'sil',pos:'c',ghost:true}],cap:['\u665a\u4e0a\u5341\u9ede\uff0c\u8001\u5e2b\u5728\u9580\u5916\u53eb\u4f60\u958b\u9580\u3002','[\u5343\u842c\u4e0d\u8981\u56de\u7b54]\u3002'],red:1},
   {bg:'corridor',chars:[{c:'xk',f:'shock',pos:'c'}],cap:['\u9694\u5929\u51cc\u6668\uff0c\u5ba4\u53cb\u7684\u5e8a\u2026\u2026','[\u7a7a\u4e86]\u3002']},
   {bg:'elevator',fx:'glitch',cap:['\u65c5\u793e\uff0c\u53ea\u6709\u4e09\u5c64\u6a13\u3002','\u53ef\u662f\u96fb\u68af\uff0c[\u505c\u5728\u4e86 4 \u6a13]\u3002'],red:1}]},
 'metro':{acc:'#2fb3a3',tagline:'\u7b54\u6848\uff0c\u9084\u5728\u9019\u7bc0\u8eca\u5ec2\u88e1',tags:['\u63a8\u7406','\u8fa6\u6848','\u53cd\u8f49'],
  poster:{bg:'traincar',chars:[{c:'rt',f:'s',x:96,y:140,s:200},{c:'kevin',f:'sly',x:-14,y:250,s:150,dim:true},{c:'hat',f:'a',x:224,y:250,s:150,dim:true}]},
  eps:[['\u672b\u73ed\u8eca','\u65b7\u96fb 40 \u79d2\uff0c\u5979\u6d88\u5931\u4e86'],['\u5979\u7684\u624b\u6a5f','\u89e3\u9396\u5bc6\u78bc\uff0c\u85cf\u5728\u5979\u7684\u6a02\u8b5c\u88e1'],['\u5be9\u554f','\u4e94\u500b\u4eba\uff0c\u4e00\u500b\u5728\u8aaa\u8b0a'],['\u6d88\u5931\u7684\u56db\u5341\u79d2','\u8eca\u7a97\u5916\uff0c\u8cbc\u8457\u4e00\u5f35\u81c9'],['\u5c0d\u8cea','\u6234\u53e3\u7f69\u7684\u7537\u4eba\uff0c\u6458\u4e0b\u4e86\u53e3\u7f69']],
  shots:[
   {bg:'platform',fx:'dust',cap:['\u672b\u73ed\u8eca\uff0c','\u8eca\u5ec2\u88e1\u53ea\u5269 [7 \u500b\u4eba]\u3002']},
   {bg:'blackout',fx:'flicker',cap:['\u96a7\u9053\u88e1\uff0c','\u7a81\u7136[\u65b7\u96fb 40 \u79d2]\u3002']},
   {bg:'seat',chars:[{c:'rt',f:'s',pos:'c',ghost:true}],cap:['\u71c8\u4eae\u6642\uff0c\u5b78\u59ca\u4e0d\u898b\u4e86\u3002','\u53ef\u662f\u8eca\u9580\uff0c[\u5f9e\u4f86\u6c92\u6253\u958b\u904e]\u3002']},
   {bg:'traincar',chars:[{c:'kevin',f:'sly',pos:'c'}],cap:['\u6bcf\u500b\u4eba\u90fd\u8aaa\uff0c\u4ec0\u9ebc\u90fd\u6c92\u770b\u5230\u3002','\u4f46[\u6709\u4e00\u500b\u4eba\u5728\u8aaa\u8b0a]\u3002']},
   {bg:'traincar',fx:'redpulse',chars:[{c:'hat',f:'a',pos:'c'}],cap:['\u800c\u90a3\u500b\u6234\u53e3\u7f69\u7684\u7537\u4eba\uff0c','\u4e00\u76f4[\u76ef\u8457\u4ed6]\u3002']}]},
 'wonders':{acc:'#b48ef0',tagline:'\u89e3\u958b\u4e03\u500b\u8b0e\uff0c\u5be6\u73fe\u4e00\u500b\u9858\u671b',tags:['\u6821\u5712','\u8f15\u6050\u6016','\u63a8\u7406'],
  poster:{bg:'board',chars:[{c:'qq',f:'s',x:100,y:160,s:190},{c:'an',f:'sly',x:-10,y:250,s:145},{c:'dm',f:'shock',x:226,y:250,s:145}]},
  eps:[['\u5165\u793e','\u7434\u8072\uff0c\u5728 11 \u9ede\u6e96\u6642\u97ff\u8d77'],['\u7728\u773c\u7684\u756b\u50cf','\u5b83\u7684\u773c\u775b\uff0c\u8ddf\u8457\u4f60\u79fb\u52d5'],['\u7b2c\u4e09\u9593','\u5973\u5ec1\u7b2c\u4e09\u9593\uff0c\u50b3\u4f86\u6572\u9580\u8072'],['\u7406\u5316\u6559\u5ba4','\u4eba\u9ad4\u6a21\u578b\uff0c\u671d\u4f60\u5011\u5012\u4e0b\u4f86'],['\u7b2c\u4e03\u500b\u4e0d\u53ef\u601d\u8b70','\u4e94\u500b\u793e\u54e1\uff0c\u516d\u5f35\u6905\u5b50']],
  shots:[
   {bg:'board',cap:['\u4e00\u591c\u4e4b\u9593\uff0c\u5168\u6821\u8cbc\u6eff','[\u4e03\u5927\u4e0d\u53ef\u601d\u8b70]\u3002']},
   {bg:'piano',fx:'dust',cap:['\u6c92\u6709\u4eba\u7684\u97f3\u6a02\u6559\u5ba4\uff0c','\u7434\u8072\u6bcf\u665a [11 \u9ede]\u97ff\u8d77\u3002']},
   {bg:'painting',fx:'flicker',cap:['\u756b\u50cf\u6703\u7728\u773c\uff0c','\u6a13\u68af[\u6703\u591a\u4e00\u968e]\u3002']},
   {bg:'chairs',chars:[{c:'qq',f:'t',pos:'c'}],who:'\u5468\u828a\u828a',cap:['\u300c\u793e\u5718\u8981\u662f\u88ab\u5ee2\u6389\u2026\u2026\u300d','\u300c\u6211\u5c31[\u6c92\u6709\u5730\u65b9\u53ef\u4ee5\u53bb\u4e86]\u3002\u300d']},
   {bg:'chairs',fx:'redpulse',chars:[{c:'dm',f:'shock',pos:'c'}],cap:['\u6211\u5011\u793e\u5718\uff0c\u660e\u660e\u53ea\u6709\u4e94\u500b\u4eba\u2026\u2026','\u70ba\u4ec0\u9ebc\u6709[\u516d\u5f35\u6905\u5b50]\uff1f'],red:1}]},
'live':{acc:'#ff3d7f',tagline:'\u6709\u4e00\u500b\u5e33\u865f\uff0c\u6bd4\u756b\u9762\u65e9\u4e86 10 \u79d2',tags:['\u76f4\u64ad','\u7db2\u8def\u61f8\u7591','\u9a5a\u609a'],
  poster:{bg:'lferris',chars:[{c:'yoru',f:'t',x:96,y:170,s:190},{c:'sil',f:'n',x:-6,y:250,s:140,glow:true},{c:'bao',f:'sly',x:226,y:256,s:140,dim:true}]},
  eps:[['\u958b\u64ad','\u5bc6\u78bc\uff0c\u8981\u7528\u300c\u6211\u5011\u7684\u5beb\u6cd5\u300d'],['\u65cb\u8f49\u6728\u99ac','\u5979\u6bd4\u73fe\u5834\u65e9\u4e86 10 \u79d2'],['\u93e1\u5b50\u8ff7\u5bae','\u93e1\u5b50\u88e1\uff0c\u591a\u4e86\u4e00\u5c0d\u8033\u6735'],['\u54e1\u5de5\u4f11\u606f\u5ba4','\u5047\u5e33\u865f\u80cc\u5f8c\u7684\u4eba'],['\u6469\u5929\u8f2a','\u5c0f\u5149_0817 \u662f\u8ab0\uff1f']],
  shots:[
   {bg:'lgate',cap:['\u5ee2\u68c4 17 \u5e74\u7684\u661f\u5149\u6a02\u5712\uff0c','\u4eca\u665a[\u958b\u64ad]\u3002']},
   {bg:'lchat',cap:['\u4f60\u662f\u804a\u5929\u5ba4\u7ba1\u7406\u54e1\u3002','\u4e09\u5343\u5247\u7559\u8a00\u88e1\uff0c[\u53ea\u6709\u4e00\u5247\u662f\u771f\u7684]\u3002']},
   {bg:'lcarousel',fx:'flicker',cap:['\u6709\u4e00\u500b\u5e33\u865f\uff0c','\u6bd4\u73fe\u5834[\u65e9\u4e86 10 \u79d2]\u3002']},
   {bg:'lmirror',chars:[{c:'yoru',f:'shock',pos:'c'}],who:'\u5c0f\u591c Yoru',cap:['\u300c\u5927\u5bb6\uff0c\u93e1\u5b50\u88e1\u2026\u2026','\u6211\u5f8c\u9762[\u662f\u4e0d\u662f\u7ad9\u8457\u4e00\u500b\u4eba]\uff1f\u300d']},
   {bg:'lferris',fx:'redpulse',cap:['\u4f60\u62da\u547d\u4fdd\u8b77\u7684\u90a3\u500b\u4eba\uff0c','[\u771f\u7684\u503c\u5f97\u4f60\u76f8\u4fe1\u55ce]\uff1f'],red:1},
   {bg:'lvod',fx:'dust',cap:['\u76f4\u64ad\u7d50\u675f\u4e4b\u5f8c\uff0c','\u56de\u653e\u88e1\u591a\u4e86[\u4e00\u5247\u7559\u8a00]\u3002']}]},
'seventh':{acc:'#8fd18a',tagline:'\u9ede\u540d\u7684\u6642\u5019\uff0c\u591a\u4e86\u4e00\u500b\u4eba',tags:['\u5c71\u6797','\u53f0\u7063\u50b3\u8aaa','\u9b54\u795e\u4ed4'],
  poster:{bg:'s7hut',chars:[{c:'mi',f:'s',x:96,y:170,s:190},{c:'zhe',f:'sly',x:-10,y:252,s:145,dim:true},{c:'sil',f:'n',x:226,y:252,s:140,glow:true}]},
  eps:[['\u767b\u5c71\u53e3','\u5f71\u5b50\u6307\u5411\u6771\u5317'],['\u5de5\u5bee','\u516d\u500b\u4eba\uff0c\u9ede\u51fa\u4e86\u4e03\u500b'],['\u534a\u591c','\u7a97\u5916\u6709\u4eba\u53eb\u4f60\u7684\u540d\u5b57'],['\u7167\u7247','\u653e\u5927\u4e4b\u5f8c\uff0c\u5f71\u5b50\u4e0d\u898b\u4e86'],['\u5929\u4eae\u524d','\u4e0d\u8981\u56de\u982d']],
  shots:[
   {bg:'s7trail',cap:['\u767b\u5c71\u793e\u516d\u500b\u4eba\uff0c','\u8d70\u9032\u4e86[\u9b3c\u6e56\u6b65\u9053]\u3002']},
   {bg:'s7fog',fx:'flicker',cap:['\u9727\uff0c\u7a81\u7136\u8b8a\u6fc3\u4e86\u3002','\u6307\u793a\u724c\uff0c[\u5012\u5728\u5730\u4e0a]\u3002']},
   {bg:'s7count',cap:['\u5929\u9ed1\u4e4b\u5f8c\u9ede\u540d\uff1a','\u4e00\u3001\u4e8c\u3001\u4e09\u3001\u56db\u3001\u4e94\u3001\u516d\u2026\u2026[\u4e03]\u3002']},
   {bg:'s7hut',chars:[{c:'ting',f:'t',pos:'c'}],who:'\u96c5\u5a77',cap:['\u300c\u807d\u5230\u6709\u4eba\u53eb\u4f60\u7684\u540d\u5b57\uff0c','[\u5343\u842c\u4e0d\u8981\u56de\u7b54]\u3002\u300d']},
   {bg:'s7window',fx:'redpulse',cap:['\u534a\u591c\u5169\u9ede\u5341\u4e09\u5206\uff0c','\u7a97\u5916\u6709\u4eba[\u5728\u53eb\u4f60]\u3002'],red:1},
   {bg:'s7ridge',fx:'dust',cap:['\u5929\u4eae\u4e4b\u524d\uff0c','[\u5343\u842c\u4e0d\u8981\u56de\u982d]\u3002']}]},
'nightmare':{acc:'#ff6b5a',tagline:'\u4e0b\u4e00\u6b21\u9418\u8072\u4e4b\u524d\uff0c\u4e00\u5b9a\u8981\u9192\u4f86',tags:['\u5b78\u751f\u60e1\u5922','\u6703\u8003','\u5fc3\u7406\u61f8\u7591'],
  poster:{bg:'s8class',chars:[{c:'xj',f:'sly',x:96,y:180,s:190},{c:'sil',f:'n',x:-6,y:252,s:140,glow:true},{c:'momn',f:'t',x:226,y:256,s:140,dim:true}]},
  eps:[['\u7b2c\u96f6\u7bc0','\u9ed1\u677f\u4e0a\u5beb\u8457\uff1a\u7b2c\u96f6\u7bc0'],['\u7121\u76e1\u6a13\u68af','\u5f80\u4e0b\u4e00\u5c64\uff0c\u9084\u662f 4 \u6a13'],['\u4fdd\u5065\u5ba4','\u93e1\u5b50\u88e1\uff0c\u6709\u4e00\u500b\u6c92\u6709\u81c9\u7684\u4eba'],['\u65e9\u5b89','\u9192\u4e86\uff1f\u9084\u662f\u9084\u5728\u5922\u88e1\uff1f'],['\u9192\u4f86','\u5169\u96bb\u4f38\u904e\u4f86\u7684\u624b']],
  shots:[
   {bg:'s8desk',cap:['\u6703\u8003\u524d\u4e00\u665a\uff0c','\u300c\u597d\u60f3\u7761\u8457\uff0c[\u4e0d\u8981\u9192\u4f86]\u3002\u300d']},
   {bg:'s8class',fx:'flicker',cap:['\u518d\u775c\u958b\u773c\uff0c','\u9ed1\u677f\u4e0a\u5beb\u8457\uff1a[\u7b2c\u96f6\u7bc0]\u3002']},
   {bg:'s8class',chars:[{c:'xj',f:'h',pos:'c'}],who:'\u5c0f\u93e1',cap:['\u300c\u5728\u9019\u88e1\uff0c','\u5c31[\u6c38\u9060\u4e0d\u7528\u8003\u8a66]\u4e86\u3002\u300d']},
   {bg:'s8stairs',cap:['\u5f80\u4e0b\u8dd1\u4e86\u4e00\u5c64\uff0c','\u9084\u662f [4 \u6a13]\u3002']},
   {bg:'s8mirror',fx:'redpulse',cap:['\u93e1\u5b50\u88e1\uff0c','\u4f60\u7684\u8eab\u5f8c[\u7ad9\u8457\u4e00\u500b\u4eba]\u3002'],red:1},
   {bg:'s8desk',fx:'dust',cap:['\u9418\u8072\u6bcf 9 \u5206\u9418\u97ff\u4e00\u6b21\u3002','[\u4e0b\u4e00\u6b21\u4e4b\u524d\uff0c\u4e00\u5b9a\u8981\u9192\u4f86]\u3002']}]},
 'haunt':{acc:'#ff7a3c',tagline:'\u6211\u5011\u60f3\u5687\u4eba\uff0c\u7d50\u679c\u5ba2\u4eba\u4e0d\u662f\u4eba',tags:['\u6821\u6176','\u9b3c\u5c4b','\u53f0\u7063\u50b3\u8aaa'],
  poster:{bg:'h9gate',chars:[{c:'xiu',f:'n',x:100,y:190,s:180},{c:'bh',f:'sly',x:-10,y:252,s:145,dim:true},{c:'py',f:'shock',x:226,y:252,s:145}]},
  eps:[['\u958b\u5f35','\u4e94\u500b\u95dc\u5361\uff0c\u4e00\u500b\u4e0d\u80fd\u6253\u958b\u7684\u8863\u6ac3'],['\u5e33\u4e0d\u5c0d','47 \u679a\u56db\u5341\u5e7e\u5e74\u524d\u7684\u786c\u5e63'],['\u505c\u96fb','\u6293\u4f4f\u4f60\u7684\uff0c\u4e0d\u53ea\u4e00\u96bb\u624b'],['\u7b2c\u4e5d\u500b\u8863\u6ac3','\u5979\u7684\u540d\u5b57\uff0c\u4e00\u7b46\u4e00\u7b46\u5730\u5beb'],['\u9589\u9928','\u592a\u967d\u4e0b\u5c71\u4ee5\u524d\uff0c\u8981\u597d\u597d\u9589\u9928']],
  shots:[
   {bg:'h9gate',cap:['\u516b\u5e74\u516b\u73ed\u7684\u6821\u6176\u9b3c\u5c4b\uff0c','\u958b\u5728\u5168\u6821[\u6700\u820a\u7684\u5bb6\u653f\u6559\u5ba4]\u3002']},
   {bg:'h9coins',cap:['\u8a08\u6578\u5668 87 \u4eba\uff0c\u624b\u74b0\u53ea\u8ce3\u51fa 40 \u689d\u3002','\u7bb1\u5b50\u88e1\uff0c\u591a\u4e86 [47 \u679a\u820a\u786c\u5e63]\u3002']},
   {bg:'h9mirror',fx:'flicker',cap:['\u6709\u4e9b\u5ba2\u4eba\uff0c','\u5728\u93e1\u5b50\u88e1[\u6c92\u6709\u5012\u5f71]\u3002']},
   {bg:'h9gate',chars:[{c:'xiu',f:'n',pos:'c'}],who:'\u9ec3\u8272\u96e8\u8863\u7684\u5c0f\u5973\u5b69',cap:['\u300c\u5927\u54e5\u54e5\uff0c\u6211\u53ef\u4ee5\u9032\u53bb\u55ce\uff1f','\u6211[\u627e\u4e0d\u5230\u6211\u7684\u540d\u724c]\u4e86\u3002\u300d']},
   {bg:'h9dark',fx:'redpulse',cap:['\u505c\u96fb\u7684\u90a3\u4e00\u523b\uff0c','\u6709\u4eba\u6293\u4f4f\u4e86\u4f60\u7684[\u5169\u96bb\u624b]\u3002'],red:1},
   {bg:'h9wardrobe',fx:'dust',cap:['\u7b2c\u4e5d\u500b\u8863\u6ac3\uff0c','[\u7d55\u5c0d\u4e0d\u80fd\u6253\u958b]\u3002']}]},
'loop':{acc:'#ffd36a',tagline:'12:10\uff0c\u4e00\u5207\u53c8\u91cd\u4f86\u4e86',tags:['\u6642\u9593\u8ff4\u5708','\u6821\u5712','\u61f8\u7591'],
  poster:{bg:'l10class',chars:[{c:'kui',f:'t',x:96,y:190,s:190},{c:'me',f:'s',x:-10,y:256,s:145,dim:true},{c:'da',f:'h',x:226,y:256,s:140,dim:true}]},
  eps:[['\u661f\u671f\u4e94','12:10\uff0c\u4e00\u5207\u91cd\u4f86'],['\u540a\u6247','\u53ea\u6709\u4e00\u500b\u4eba\u8aaa\u8b0a'],['\u56db\u5c0f\u6642','12:10 \u4e4b\u524d\uff0c\u4fee\u597d\u5b83'],['\u6b63\u5b57','\u5979\u756b\u4e86 47 \u7b46'],['\u7b2c\u5341\u4e09\u968e','\u8b93\u660e\u5929\u4f86\u5427']],
  shots:[
   {bg:'l10class',cap:['\u6bb5\u8003\u524d\u4e00\u5929\u7684\u661f\u671f\u4e94\u3002','\u6559\u5ba4\u7684\u540a\u6247\uff0c[\u560e\u5566\u560e\u5566]\u5730\u8f49\u3002']},
   {bg:'l10clock',fx:'flicker',cap:['12:10 \u7684\u9418\u8072\u4e00\u97ff\uff0c','\u4e00\u5207\u56de\u5230 [07:30]\u3002']},
   {bg:'l10class',chars:[{c:'kui',f:'t',pos:'c'}],who:'\u90b1\u8a9e\u8475',cap:['\u300c\u6211\u5011\u63db\u4f4d\u5b50\uff0c','[\u597d\u4e0d\u597d]\uff1f\u300d']},
   {bg:'l10class',fx:'redpulse',cap:['\u4f60\u4ee5\u70ba\uff0c','[\u53ea\u6709\u4f60\u8a18\u5f97]\u3002'],red:1},
   {bg:'l10tally',fx:'dust',cap:['\u5979\u7684\u7b46\u8a18\u672c\u4e0a\uff0c','\u756b\u6eff\u4e86[\u6b63\u5b57]\u3002']},
   {bg:'l10stairs',cap:['\u4e2d\u5348\u7684\u9418\u8072\u4e4b\u524d\uff0c','\u820a\u5927\u6a13\u6703\u591a\u51fa[\u7b2c\u5341\u4e09\u968e]\u3002']}]},
'eighth':{acc:'#5ae0ff',tagline:'\u653e\u5b78\u9418\uff0c\u4e00\u76f4\u6c92\u6709\u97ff',tags:['\u6821\u5712','\u79d1\u5e7b','\u9a5a\u609a'],
  poster:{bg:'e11class',chars:[{c:'yu8',f:'s',x:96,y:190,s:190},{c:'me',f:'t',x:-10,y:256,s:145,dim:true},{c:'ming',f:'h',x:226,y:256,s:140,dim:true}]},
  eps:[['\u7b2c\u516b\u7bc0','\u6642\u9418\u505c\u5728 17:29'],['\u91cd\u8907','\u53ea\u6709\u4e00\u500b\u4eba\u6c92\u6709\u91cd\u8907'],['\u73bb\u7483','\u53cd\u904e\u4f86\u7684\u5c55\u793a\u724c'],['\u806f\u7d61\u7c3f','\u8cc7\u6599\u88e1\u6c92\u6709\u7684\uff0c\u6211\u90fd\u6c92\u6709'],['\u9589\u9928','\u5f80\u6709\u98a8\u7684\u5730\u65b9']],
  shots:[
   {bg:'e11class',cap:['\u661f\u671f\u4e94\uff0c\u7b2c\u516b\u7bc0\u8f14\u5c0e\u8ab2\u3002','\u518d[\u4e00\u5206\u9418]\u5c31\u653e\u5b78\u4e86\u3002']},
   {bg:'e11clock',fx:'flicker',cap:['\u79d2\u91dd\u4e00\u76f4\u5728\u8f49\uff0c','\u5206\u91dd\u537b\u505c\u5728 [17:29]\u3002']},
   {bg:'e11class',chars:[{c:'ming',f:'h',pos:'c'}],who:'\u963f\u660e',cap:['\u300c\u6b38\uff0c\u4f60\u77e5\u9053\u70ba\u4ec0\u9ebc\u6578\u5b78\u8ab2\u672c\u5f88\u6182\u9b31\u55ce\uff1f\u300d','\u4ed6\u5df2\u7d93\u8b1b\u4e86[\u7b2c\u4e94\u904d]\u3002']},
   {bg:'e11window',fx:'redpulse',cap:['\u5230\u4e86\u665a\u4e0a\uff0c\u7a97\u5916\u7684\u64cd\u5834\u4e0d\u898b\u4e86\u3002','[\u6709\u6771\u897f\u8cbc\u4e0a\u4e86\u73bb\u7483]\u3002'],red:1},
   {bg:'e11museum',cap:['\u6559\u5ba4\u5f8c\u9580\u5916\u9762\uff0c','\u662f\u4e00\u9593[\u96ea\u767d\u7684\u5c55\u5ef3]\u3002']},
   {bg:'e11dawn',fx:'dust',cap:['\u653e\u5b78\u4ee5\u5f8c\uff0c','\u4f60\u8981\u53bb\u54ea\u88e1\uff1f']}]},
 'next':{acc:'#95a1b7',tagline:'\u7b2c\u5341\u4e00\u500b\u62bd\u5c5c\uff0c\u6628\u665a\u52d5\u4e86\u4e00\u4e0b',tags:['\u5373\u5c07\u4e0a\u6620'],poster:{bg:'locked',chars:[]},eps:[],shots:[]}
};
const shotLen=s=>1700+s.cap.length*1400;
function trailerSecs(id){const d=DATA[id];return d?Math.round((d.shots.reduce((a,s)=>a+shotLen(s),0)+3000)/1000):0}

/* ---------- poster ---------- */
function posterSVG(id,title){
  const d=DATA[id];if(!d)return '';
  const g1=U(),g2=U();
  const chars=d.poster.chars.map(ch=>`<svg x="${ch.x}" y="${ch.y}" width="${ch.s}" height="${ch.s}" viewBox="0 0 80 80" opacity="${ch.dim?.82:1}">${bust(CH[ch.c],ch.f).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg>${ch.glow?`<circle cx="${ch.x+ch.s/2}" cy="${ch.y+ch.s*.47}" r="${ch.s*.35}" fill="#ff3b30" opacity=".12"/>`:''}`).join('');
  const t=title||'';
  return `<svg viewBox="0 0 360 450" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
   <defs><linearGradient id="${g1}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".95"/></linearGradient>
   <radialGradient id="${g2}" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="${d.acc}" stop-opacity=".28"/><stop offset="1" stop-color="${d.acc}" stop-opacity="0"/></radialGradient></defs>
   ${d.poster.img?`<image href="${d.poster.img}" x="0" y="0" width="360" height="450" preserveAspectRatio="xMidYMid slice"/>`:`<svg x="0" y="0" width="360" height="450" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice">${(BG[d.poster.bg])()}</svg>`}
   <rect width="360" height="450" fill="url(#${g2})"/>${chars}<rect width="360" height="450" fill="url(#${g1})"/>
   <text x="16" y="28" font-family="monospace" font-size="11" letter-spacing="3" fill="#e8e2d6" opacity=".85">\u8b0e\u5323 \u51fa\u54c1</text>
   ${d.eps.length?`<rect x="284" y="14" width="62" height="22" rx="4" fill="${d.acc}"/><text x="315" y="30" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="700" fill="#111">\u5168 ${d.eps.length} \u96c6</text>`:''}
   <text x="180" y="${t.length>6?352:356}" text-anchor="middle" font-family="'Noto Serif TC',serif" font-weight="900" font-size="${t.length>6?34:42}" fill="${d.acc}" opacity=".55" transform="translate(2 2)">${t}</text>
   <text x="180" y="${t.length>6?352:356}" text-anchor="middle" font-family="'Noto Serif TC',serif" font-weight="900" font-size="${t.length>6?34:42}" fill="#fff" stroke="#000" stroke-width="5" paint-order="stroke">${t}</text>
   <text x="180" y="390" text-anchor="middle" font-family="'Noto Sans TC',sans-serif" font-weight="700" font-size="15" fill="${d.acc}" letter-spacing="2">${d.tagline}</text>
   <text x="180" y="424" text-anchor="middle" font-family="'Noto Sans TC',sans-serif" font-size="12" fill="#d8d2dc" letter-spacing="2">${d.tags.join(' \u00b7 ')}</text>
  </svg>`;
}

/* ---------- trailer player ---------- */
const CSS=`
.tr{position:fixed;inset:0;z-index:80;background:#000;display:flex;justify-content:center;animation:trIn .35s ease}
@keyframes trIn{from{opacity:0}}
.tr-stage{position:relative;width:100%;max-width:480px;height:100%;overflow:hidden;background:#000;cursor:pointer}
.tr-bars{position:absolute;top:calc(10px + env(safe-area-inset-top,0px));left:12px;right:12px;display:flex;gap:4px;z-index:5}
.tr-bars i{flex:1;height:3px;border-radius:2px;background:rgba(255,255,255,.25);overflow:hidden}
.tr-bars i b{display:block;height:100%;width:0;background:#fff}
.tr-bars i.done b{width:100%}
.tr-bars i.on b{animation:trBar var(--d) linear forwards}
@keyframes trBar{to{width:100%}}
.tr-top{position:absolute;top:calc(22px + env(safe-area-inset-top,0px));left:12px;right:12px;display:flex;justify-content:space-between;align-items:center;z-index:5;color:#fff}
.tr-top span{font-family:"IBM Plex Mono",monospace;font-size:11px;letter-spacing:.25em;opacity:.85}
.tr-x{width:44px;height:44px;border-radius:50%;border:0;background:rgba(0,0,0,.4);color:#fff;display:grid;place-items:center}
.tr-x svg{width:20px;height:20px}
.tr-shot{position:absolute;inset:0}
.tr-shot.in{animation:trCut .35s ease}
@keyframes trCut{0%{opacity:0;filter:brightness(3) blur(6px)}100%{opacity:1;filter:none}}
.tr-bg{position:absolute;inset:0}
.tr-bg svg{width:100%;height:100%;transform-origin:50% 55%;animation:var(--kb) var(--d) ease-out forwards}
@keyframes kbIn{from{transform:scale(1.02)}to{transform:scale(1.18)}}
@keyframes kbL{from{transform:scale(1.15) translateX(4%)}to{transform:scale(1.15) translateX(-4%)}}
@keyframes kbUp{from{transform:scale(1.2) translateY(4%)}to{transform:scale(1.08) translateY(-2%)}}
.tr-char{position:absolute;left:50%;bottom:16%;width:82%;transform:translateX(-50%);-webkit-mask-image:linear-gradient(#000 72%,transparent);mask-image:linear-gradient(#000 72%,transparent);filter:drop-shadow(0 0 18px var(--acc));animation:trChar var(--d) ease-out forwards}
.tr-char svg{display:block;width:100%;height:auto}
.tr-char.ghost{opacity:.72;filter:drop-shadow(0 0 24px var(--acc)) saturate(.6) brightness(.9)}
@keyframes trChar{from{transform:translateX(-50%) translateY(16px) scale(.96)}to{transform:translateX(-50%) translateY(0) scale(1.04)}}
.tr-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.55),transparent 22%,transparent 52%,rgba(0,0,0,.92))}
.tr-cap{position:absolute;left:18px;right:18px;bottom:calc(72px + env(safe-area-inset-bottom,0px));display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center}
.tr-who{font-size:13px;letter-spacing:.2em;color:var(--acc);font-weight:700}
.tr-line{font-family:"Noto Sans TC",sans-serif;font-weight:900;font-size:clamp(22px,6.4vw,30px);line-height:1.35;color:#fff;-webkit-text-stroke:5px #000;paint-order:stroke fill;text-shadow:0 4px 14px rgba(0,0,0,.8);opacity:0;transform:translateY(10px);transition:opacity .35s,transform .35s}
.tr-line.show{opacity:1;transform:none}
.tr-line.punch{animation:trPunch .45s cubic-bezier(.2,1.6,.4,1)}
@keyframes trPunch{0%{transform:scale(1.5);opacity:0}100%{transform:scale(1);opacity:1}}
.tr-line em{font-style:normal;color:#ffd84a}
.tr-line.red em{color:#ff3b3b}
.tr-fx{position:absolute;inset:0;pointer-events:none}
.tr-fx.rain{background:repeating-linear-gradient(105deg,transparent 0 9px,rgba(170,190,220,.24) 9px 10px);background-size:40px 40px;animation:trRain .45s linear infinite}
@keyframes trRain{to{background-position:-12px 40px}}
.tr-fx.dust{background:radial-gradient(circle at 20% 30%,rgba(255,240,200,.18) 0 2px,transparent 3px),radial-gradient(circle at 70% 60%,rgba(255,240,200,.14) 0 2px,transparent 3px),radial-gradient(circle at 40% 80%,rgba(255,240,200,.12) 0 2px,transparent 3px);background-size:120px 160px;animation:trDust 6s linear infinite}
@keyframes trDust{to{background-position:30px -160px}}
.tr-fx.redpulse{background:radial-gradient(ellipse at center,transparent 40%,rgba(200,0,20,.5));animation:trPulse 1.1s ease-in-out infinite}
@keyframes trPulse{50%{opacity:.3}}
.tr-fx.flicker{background:#000;animation:trFlick 2.4s steps(1) infinite}
@keyframes trFlick{0%,30%,34%,60%,100%{opacity:0}32%{opacity:.85}62%{opacity:.6}}
.tr-fx.glitch{animation:trGlitch 1.2s steps(1) infinite;background:linear-gradient(transparent 48%,rgba(255,60,80,.35) 48% 52%,transparent 52%)}
@keyframes trGlitch{0%,70%,100%{transform:none;opacity:0}72%{transform:translateY(-120px);opacity:1}76%{transform:translateY(80px);opacity:1}80%{opacity:0}}
.tr-fx.flash{background:#fff;animation:trFlash 3s ease-out}
@keyframes trFlash{0%,60%{opacity:0}62%{opacity:.85}100%{opacity:0}}
.tr-fx.knock{animation:trKnock 1.4s steps(1) infinite}
@keyframes trKnock{0%,20%,40%,100%{transform:none}10%,30%{transform:translateX(-6px)}}
.tr-hint{position:absolute;left:0;right:0;bottom:calc(22px + env(safe-area-inset-bottom,0px));text-align:center;font-size:12px;color:rgba(255,255,255,.55)}
.tr-end{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:12px;padding:0 20px calc(40px + env(safe-area-inset-bottom,0px));animation:trCut .5s ease}
.tr-end .pst{position:absolute;inset:0}
.tr-end .pst svg{width:100%;height:100%;animation:kbIn 8s ease-out forwards}
.tr-end .row{position:relative;display:flex;gap:10px;width:100%;max-width:360px}
.tr-end a,.tr-end button.again{flex:1;min-height:50px;border-radius:12px;display:flex;align-items:center;justify-content:center;gap:8px;font-weight:700;font-size:16px;text-decoration:none;border:0}
.tr-end button.again{flex:0 0 auto;padding:0 16px;background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.25)}
.tr-end svg.i{width:18px;height:18px}
@media (prefers-reduced-motion:reduce){.tr *{animation:none!important;transition:none!important}.tr-line{opacity:1;transform:none}}`;
const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
const I={x:'<path d="M6 6l12 12M18 6L6 18"/>',play:'<path d="M7 4.5v15l12-7.5z" fill="currentColor" stroke="none"/>',rotate:'<path d="M4 12a8 8 0 1 0 2.5-5.8"/><path d="M4 4v4h4"/>'};
const ic=k=>`<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;
const capHTML=t=>t.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'})[c]).replace(/\[(.+?)\]/g,'<em>$1</em>');

/* trailer audio */
let A=null;
function au(){if(A)return A;try{const C=window.AudioContext||window.webkitAudioContext;const c=new C();const m=c.createGain();m.gain.value=.8;m.connect(c.destination);
  const len=c.sampleRate,buf=c.createBuffer(1,len,c.sampleRate),d=buf.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;
  A={c,m,buf,drone:null};}catch(e){A=null}return A}
function whoosh(){const a=au();if(!a)return;const c=a.c,t=c.currentTime,s=c.createBufferSource();s.buffer=a.buf;const bp=c.createBiquadFilter();bp.type='bandpass';bp.Q.value=1.2;bp.frequency.setValueAtTime(300,t);bp.frequency.exponentialRampToValueAtTime(3000,t+.35);const e=c.createGain();e.gain.setValueAtTime(0,t);e.gain.linearRampToValueAtTime(.35,t+.15);e.gain.exponentialRampToValueAtTime(.001,t+.45);s.connect(bp).connect(e).connect(a.m);s.start(t);s.stop(t+.5)}
function boom(red){const a=au();if(!a)return;const c=a.c,t=c.currentTime,o=c.createOscillator(),e=c.createGain();o.frequency.setValueAtTime(red?90:120,t);o.frequency.exponentialRampToValueAtTime(32,t+.6);e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(.6,t+.01);e.gain.exponentialRampToValueAtTime(.0001,t+.8);o.connect(e).connect(a.m);o.start(t);o.stop(t+.85);
  if(red){const h=c.createOscillator(),g=c.createGain();h.type='sawtooth';h.frequency.setValueAtTime(1400,t);h.frequency.exponentialRampToValueAtTime(500,t+.5);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.05,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+.6);h.connect(g).connect(a.m);h.start(t);h.stop(t+.65)}}
function droneOn(acc){const a=au();if(!a||a.drone)return;const c=a.c;c.resume&&c.resume();const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=220;const g=c.createGain();g.gain.value=0;g.gain.setTargetAtTime(.9,c.currentTime,.8);
  const os=[[55,.05],[55.6,.05],[82.4,.03],[110,.015]].map(([hz,v])=>{const o=c.createOscillator();o.type='sawtooth';o.frequency.value=hz;const gg=c.createGain();gg.gain.value=v;o.connect(gg).connect(lp);o.start();return o});lp.connect(g).connect(a.m);a.drone={g,os}}
function droneOff(){if(!A||!A.drone)return;const d=A.drone;A.drone=null;d.g.gain.setTargetAtTime(0,A.c.currentTime,.3);setTimeout(()=>d.os.forEach(o=>{try{o.stop()}catch(e){}}),1200)}
function heartbeat(){const a=au();if(!a)return;[0,.22].forEach(dt=>{const c=a.c,t=c.currentTime+dt,o=c.createOscillator(),e=c.createGain();o.frequency.setValueAtTime(65,t);o.frequency.exponentialRampToValueAtTime(35,t+.16);e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(.4,t+.01);e.gain.exponentialRampToValueAtTime(.0001,t+.22);o.connect(e).connect(a.m);o.start(t);o.stop(t+.25)})}

const reduceM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function playTrailer(id,meta){
  const d=DATA[id];if(!d||!d.shots.length)return;
  droneOn();
  const el=document.createElement('div');el.className='tr';el.setAttribute('role','dialog');el.setAttribute('aria-label',`\u300a${meta.title}\u300b\u9810\u544a`);el.style.setProperty('--acc',d.acc);
  el.innerHTML=`<div class="tr-stage"><div class="tr-shot"></div><div class="tr-bars">${d.shots.map(()=>'<i><b></b></i>').join('')}<i><b></b></i></div>
   <div class="tr-top"><span>\u8b0e\u5323 \u00b7 \u9810\u544a \u00b7 ${meta.title}</span><button class="tr-x" aria-label="\u95dc\u9589\u9810\u544a">${ic('x')}</button></div><div class="tr-hint">\u9ede\u756b\u9762\u8df3\u5230\u4e0b\u4e00\u5e55</div></div>`;
  document.body.appendChild(el);
  const stage=el.querySelector('.tr-stage'),shotEl=el.querySelector('.tr-shot'),bars=[...el.querySelectorAll('.tr-bars i')];
  let idx=-1,timers=[];const clear=()=>{timers.forEach(clearTimeout);timers=[]};
  const KB=['kbIn','kbL','kbUp'];
  function show(i){
    clear();idx=i;bars.forEach((b,k)=>{b.classList.toggle('done',k<i);b.classList.remove('on')});
    if(i>=d.shots.length)return endCard();
    const s=d.shots[i],dur=shotLen(s);
    bars[i].style.setProperty('--d',dur+'ms');void bars[i].offsetWidth;bars[i].classList.add('on');
    const chars=(s.chars||[]).map(ch=>`<div class="tr-char${ch.ghost?' ghost':''}">${bust(CH[ch.c],ch.f||'n')}</div>`).join('');
    shotEl.className='tr-shot';void shotEl.offsetWidth;shotEl.className='tr-shot in';
    shotEl.style.setProperty('--d',dur+'ms');shotEl.style.setProperty('--kb',KB[i%3]);
    shotEl.innerHTML=`<div class="tr-bg">${bgSVG(s.bg)}</div>${chars}${s.fx?`<div class="tr-fx ${s.fx}"></div>`:''}<div class="tr-shade"></div>
      <div class="tr-cap">${s.who?`<div class="tr-who">${s.who}</div>`:''}${s.cap.map((c,k)=>`<div class="tr-line${s.red&&k===s.cap.length-1?' red':''}">${capHTML(c)}</div>`).join('')}</div>`;
    whoosh();if(s.fx==='knock'||s.fx==='redpulse')heartbeat();
    const lines=[...shotEl.querySelectorAll('.tr-line')];
    lines.forEach((ln,k)=>timers.push(setTimeout(()=>{ln.classList.add('show');if(k===lines.length-1&&k>0){ln.classList.add('punch');boom(!!s.red)}},reduceM?0:300+k*1300)));
    timers.push(setTimeout(()=>show(i+1),dur));
  }
  function endCard(){
    clear();bars.forEach(b=>{b.classList.add('done');b.classList.remove('on')});
    shotEl.className='tr-shot';
    shotEl.innerHTML=`<div class="tr-end"><div class="pst">${posterSVG(id,meta.title)}</div>
      <div class="row"><button class="again">${ic('rotate')}\u91cd\u64ad</button><a href="${meta.href}" style="background:${meta.btnBg||d.acc};color:${meta.fg||'#111'}">${ic('play')}\u7acb\u5373\u89c0\u770b\u7b2c 1 \u96c6</a></div></div>`;
    boom(false);
    shotEl.querySelector('.again').onclick=e=>{e.stopPropagation();show(0)};
    shotEl.querySelector('a').onclick=e=>e.stopPropagation();
  }
  function close(){clear();droneOff();el.remove();document.removeEventListener('keydown',key)}
  function key(e){if(e.key==='Escape')close();if(e.key==='ArrowRight'&&idx<d.shots.length)show(idx+1)}
  document.addEventListener('keydown',key);
  el.querySelector('.tr-x').onclick=e=>{e.stopPropagation();close()};
  stage.addEventListener('click',()=>{if(idx<d.shots.length)show(idx+1)});
  show(0);el.querySelector('.tr-x').focus({preventScroll:true});
}
window.MIXIA_TRAILER={posterSVG,playTrailer,trailerSecs,episodes:id=>(DATA[id]||{}).eps||[]};
})();
