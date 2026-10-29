import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Highway395.css';

const STOPS = [
  { id: 'owens-lake', name: 'Owens Lake', region: 'on our right, approaching Lone Pine', x: 285, y: 715, labelX: 255, labelY: 748 },
  { id: 'visitor-center', name: 'Eastern Sierra visitor center', mapName: 'Visitor center', region: 'the junction of 395 and 136', x: 230, y: 650, labelX: 212, labelY: 663, labelAnchor: 'end' },
  { id: 'mount-whitney', name: 'Mount Whitney', mapName: 'Mt Whitney', region: 'a peak we saw', x: 97, y: 630, labelX: 20, labelY: 615 },
  { id: 'alabama-hills', name: 'Alabama Hills', region: 'Lone Pine and a natural arch', x: 190, y: 588, labelX: 172, labelY: 594, labelAnchor: 'end' },
  { id: 'big-pine', name: 'Big Pine', region: 'off-roading to volcanic cones', x: 230, y: 520, labelX: 250, labelY: 525 },
  { id: 'bristlecone-pines', name: 'Bristlecone pine forest', region: 'a forest side trip', x: 320, y: 455, labelX: 195, labelY: 485 },
  { id: 'bishop', name: 'Bishop', region: 'an Owens Valley town and its bakery', x: 230, y: 400, labelX: 250, labelY: 406 },
  { id: 'buttermilk-country', name: 'Buttermilk Country', mapLines: ['Buttermilk', 'Country'], region: 'yellow against dry mountains', x: 165, y: 420, labelX: 147, labelY: 419, labelAnchor: 'end' },
  { id: 'lake-sabrina', name: 'Lake Sabrina', region: 'west into Bishop Creek Canyon', x: 105, y: 460, labelX: 123, labelY: 464 },
  { id: 'crowley-lake', name: 'Crowley Lake', region: 'open water and volcanic stone', x: 222, y: 365, labelX: 242, labelY: 371 },
  { id: 'mammoth-lakes', name: 'Mammoth Lakes', mapName: 'Mammoth', region: 'lakes, volcanic gas, and Earthquake Fault', x: 215, y: 325, labelX: 235, labelY: 331 },
  { id: 'june-lake-loop', name: 'June Lake Loop', mapName: 'June Lake', region: 'four lakes, one loop', x: 225, y: 266, labelX: 245, labelY: 272 },
  { id: 'mono-lake', name: 'Mono Lake', region: 'the tufa towers', x: 235, y: 205, labelX: 260, labelY: 211 },
  { id: 'yosemite', name: 'Yosemite', region: 'west along Tioga Road', x: 93, y: 245, labelX: 20, labelY: 277 },
  { id: 'bodie', name: 'Bodie State Historic Park', mapName: 'Bodie', region: 'a gold-mining ghost town', x: 320, y: 135, labelX: 338, labelY: 141 },
  { id: 'lake-tahoe', name: 'Lake Tahoe', mapName: 'Tahoe', region: 'lakes and fall color', x: 220, y: 68, labelX: 244, labelY: 74 },
];

const YOSEMITE_POINTS = [
  { name: 'Tioga Pass', x: 335, y: 35, labelX: 317, labelY: 41, anchor: 'end' },
  { name: 'Tuolumne Meadows', x: 270, y: 85, labelX: 252, labelY: 91, anchor: 'end' },
  { name: 'Soda Springs', x: 325, y: 125, labelX: 307, labelY: 131, anchor: 'end' },
  { name: 'Pothole Dome', x: 220, y: 155, labelX: 238, labelY: 161 },
  { name: 'Tenaya Lake', x: 175, y: 200, labelX: 193, labelY: 206 },
  { name: 'Olmsted Point', x: 135, y: 245, labelX: 153, labelY: 251 },
  { name: 'Siesta Lake', x: 95, y: 290, labelX: 113, labelY: 296 },
  { name: 'Dead Giant Tunnel Tree', detail: 'Tuolumne Grove', x: 50, y: 340, labelX: 68, labelY: 346 },
];

const PLANE_PATH = 'M12 2 14 9 21 13 21 15 14 13 14 19 17 21 17 22 12 20 7 22 7 21 10 19 10 13 3 15 3 13 10 9Z';

const SOURCES = [
  ['Owens Lake and water diversion', 'National Academies of Sciences, Engineering, and Medicine', 'https://www.nationalacademies.org/read/25658/chapter/3'],
  ['Eastern Sierra Interagency Visitor Center', 'US Forest Service', 'https://www.fs.usda.gov/r05/inyo/offices/eastern-sierra-interagency-visitor-center'],
  ['Seeing Mount Whitney', 'National Park Service', 'https://www.nps.gov/seki/planyourvisit/whitney.htm'],
  ['Alabama Hills', 'Bureau of Land Management', 'https://www.blm.gov/visit/alabama-hills'],
  ['Big Pine volcanic field', 'US Geological Survey', 'https://www.usgs.gov/publications/late-pleistocene-ages-most-recent-volcanism-and-glacial-pluvial-deposits-big-pine'],
  ['Ancient Bristlecone Pine Forest', 'US Forest Service', 'https://www.fs.usda.gov/r05/inyo/recreation/ancient-bristlecone-pine-forest'],
  ['Schulman Grove and Discovery Trail', 'US Forest Service', 'https://www.fs.usda.gov/r05/inyo/recreation/schulman-grove'],
  ['Bristlecone forest visitor center', 'US Forest Service', 'https://www.fs.usda.gov/r05/inyo/offices/ancient-bristlecone-pine-forest-visitor-center'],
  ['Bristlecone adaptations and identification', 'National Park Service', 'https://www.nps.gov/grba/planyourvisit/identifying-bristlecone-pines.htm'],
  ['Bristlecone ecology, Schulman, and tree-ring research', 'The Gymnosperm Database', 'https://www.conifers.org/pi/Pinus_longaeva.php'],
  ['Dolomite composition and mineral colors', 'Geology.com', 'https://geology.com/minerals/dolomite.shtml'],
  ['Dolomite weathering and iron oxidation', 'Wikipedia, with geological textbook references', 'https://en.wikipedia.org/wiki/Dolomite_(rock)'],
  ['John Muir and conservation', 'National Park Service', 'https://www.nps.gov/jomu/learn/historyculture/people.htm'],
  ['Bishop water supply', 'City of Bishop', 'https://cityofbishop.ca.gov/departments/public_works/water.php'],
  ["Erick Schat's Bakkery", 'Official bakery website', 'https://schatsbakery.com/'],
  ['Bread varieties', "Erick Schat's Bakkery", 'https://schatsbakery.com/bread/'],
  ['Bakery origins and the Schat family', 'Wikipedia', 'https://en.wikipedia.org/wiki/Erick_Schat%27s_Bakkery'],
  ['The predecessor bakery and Schat family history', 'Sierra Wave', 'https://sierrawave.net/71536-2/'],
  ['Mammoth Lakes and the Lakes Basin', 'Mammoth Lakes Tourism', 'https://www.visitmammoth.com/blogs/how-to-spend-2-3-days-in-mammoth-lakes/'],
  ['Volcanic carbon dioxide and tree kill at Mammoth Mountain', 'US Geological Survey', 'https://pubs.usgs.gov/fs/fs172-96/'],
  ['Earthquake Fault', 'US Forest Service', 'https://www.fs.usda.gov/r05/inyo/recreation/earthquake-fault'],
  ['June Lake Loop', 'Mono County', 'https://www.monocounty.ca.gov/1463/June-Lake'],
  ['Mono Lake tufa', 'Mono Lake Committee', 'https://www.monolake.org/learn/aboutmonolake/naturalhistory/tufa/'],
  ['Mono Basin Scenic Area Visitor Center', 'US Forest Service', 'https://www.fs.usda.gov/organization/Mono%20Basin%20Scenic%20Area%20Visitor%20Center'],
  ['Mono Lake salinity, density, and closed basin', 'California State Parks', 'https://www.parks.ca.gov/?page_id=514'],
  ['Mono Lake water diversions and protection', 'Mono Lake Committee', 'https://www.monolake.org/learn/aboutmonolake/savingmonolake/'],
  ['Mono Lake food web', 'Mono Lake Committee', 'https://www.monolake.org/learn/aboutmonolake/naturalhistory/'],
  ['Alkali flies and their underwater air bubbles', 'Mono Lake Committee', 'https://www.monolake.org/learn/aboutmonolake/naturalhistory/alkaliflies/'],
  ['Black Point and the volcanic islands', 'US Geological Survey', 'https://www.usgs.gov/volcanoes/mono-lake-volcanic-field'],
  ['Red Sea salinity comparison', 'Peer-reviewed research, Frontiers in Microbiology (2025)', 'https://www.frontiersin.org/journals/microbiology/articles/10.3389/fmicb.2025.1435925/full'],
  ['Yosemite geology', 'National Park Service', 'https://www.nps.gov/yose/learn/nature/geology.htm'],
  ['Lake Tahoe geology', 'US Forest Service', 'https://www.fs.usda.gov/r05/laketahoebasin/natural-resources/geology'],
  ['Lake Tahoe size and depth', 'Wikipedia', 'https://en.wikipedia.org/wiki/Lake_Tahoe'],
  ['Death Valley road maps', 'National Park Service', 'https://www.nps.gov/deva/planyourvisit/maps.htm'],
  ['Bishop Creek and fall colors', 'Bishop Visitor Center', 'https://bishopvisitor.com/fall-colors/'],
  ['Crowley Lake and its columns', 'Mono County Tourism', 'https://www.monocounty.org/places-to-go/towns/crowley-lake-community/'],
  ['Bishop Tuff columns and hydrothermal cooling', 'Randolph-Flagg and colleagues, Geology (2017)', 'https://doi.org/10.1130/G39256.1'],
  ['Tioga Road, Siesta Lake, Soda Springs, Tenaya Lake and Olmsted Point', 'National Park Service', 'https://www.nps.gov/yose/planyourvisit/tm.htm'],
  ['Pothole Dome and Tuolumne Meadows hikes', 'National Park Service', 'https://www.nps.gov/yose/planyourvisit/tmhikes.htm'],
  ['Tuolumne Grove', 'National Park Service', 'https://www.nps.gov/places/000/tuolumne-grove.htm'],
  ['Historic Dead Giant tunnel photographs', 'National Park Service', 'https://www.nps.gov/yose/learn/historyculture/encroaching-civilization-visitor-activities.htm'],
  ['Bodie State Historic Park', 'California State Parks', 'https://www.parks.ca.gov/?page_id=509'],
  ['Bodie road access from Highway 395', 'Mono County Tourism', 'https://www.monocounty.org/places-to-go/bodie/'],
  ['Bodie mining history and boomtown violence', 'National Park Service', 'https://www.nps.gov/places/bodie-historic-district.htm'],
];

function jumpToStop(id) {
  const heading = document.getElementById(id);
  heading?.focus({ preventScroll: true });
  heading?.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start',
  });
}

function Landscape() {
  return (
    <figure className="roadtrip__landscape">
      <svg viewBox="0 0 760 430" role="img" aria-labelledby="sierra-sketch-title sierra-sketch-desc">
        <title id="sierra-sketch-title">A road through the Sierra, illustrated</title>
        <desc id="sierra-sketch-desc">An original landscape sketch of mountains, a lake, autumn trees, and a winding road. This is an illustration, not a photograph or a depiction of a particular stop.</desc>
        <defs>
          <linearGradient id="sierra-sky" x2="0" y2="1">
            <stop stopColor="#f8eee0" />
            <stop offset="1" stopColor="#fffdf8" />
          </linearGradient>
          <pattern id="sierra-hatching" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
            <path d="M0 0V9" stroke="#766b59" strokeWidth="0.7" opacity=".18" />
          </pattern>
        </defs>
        <path fill="url(#sierra-sky)" d="M0 0H760V430H0Z" />
        <circle cx="605" cy="82" r="36" fill="#e2bb8a" opacity=".58" />
        <path d="M0 244 79 149 130 175 232 61 302 151 352 115 466 232 549 133 616 179 692 110 760 192V430H0Z" fill="#d9d3c7" />
        <path d="m130 175 102-114 70 90-64-35-27 21-14-6Z" fill="#fffdf8" />
        <path d="m466 232 83-99 67 46-61-18-22 20-12-5Z" fill="#f3efe7" />
        <path d="m0 285 112-105 99 84 87-61 113 113 120-75 87 43 142-87v233H0Z" fill="#a8ada0" />
        <path d="m112 180 99 84 87-61 113 113-135-69-62 45-62-44Z" fill="url(#sierra-hatching)" />
        <path d="M760 282c-148-40-183-3-288 14s-164-8-228 11l-80 65H760Z" fill="#9eb1ad" />
        <path d="M435 319c98-9 181-34 282-15M384 338c123-5 232-20 354-10" fill="none" stroke="#eaf0e9" strokeWidth="2" opacity=".7" />
        <path d="M0 283c107-20 177 32 270 42s145 43 243 39 168-21 247-6v72H0Z" fill="#e0c3a2" />
        <path d="M0 341c119-20 233 20 323 49s245-12 437 10v30H0Z" fill="#c6a381" />
        <path d="M383 430c-63-51-154-39-145-72 7-25 108-21 100-44-5-17-44-18-67-35" fill="none" stroke="#fff9ee" strokeWidth="24" />
        <path d="M383 430c-63-51-154-39-145-72 7-25 108-21 100-44-5-17-44-18-67-35" fill="none" stroke="#981b20" strokeWidth="2" strokeDasharray="5 6" />
        <g fill="#697768">
          <path d="m62 227-24 64h16l-22 42h60l-23-42h17Z" />
          <path d="m107 250-19 49h13l-18 33h48l-18-33h12Z" />
          <path d="m708 239-23 62h16l-22 40h58l-22-40h16Z" />
        </g>
        <g stroke="#82644b" strokeWidth="3" fill="none">
          <path d="M554 373v-76m0 48-18-22m18 7 20-22M606 388v-64m0 36-17-19m17 7 15-15M139 389v-54" />
        </g>
        <g fill="#bf773c">
          <ellipse cx="551" cy="305" rx="28" ry="37" />
          <ellipse cx="575" cy="316" rx="20" ry="27" />
          <ellipse cx="137" cy="337" rx="22" ry="31" />
        </g>
        <g fill="#d3a64e">
          <ellipse cx="604" cy="330" rx="26" ry="35" />
          <ellipse cx="529" cy="319" rx="17" ry="25" />
          <ellipse cx="622" cy="341" rx="17" ry="23" />
        </g>
        <path d="m26 395 35-6 28 9m570-13 30-7 36 7" fill="none" stroke="#8e7057" opacity=".6" />
        <text x="30" y="46" fill="#7e5145" fontSize="12" letterSpacing="3">THE EASTERN SIERRA</text>
      </svg>
    </figure>
  );
}

function AutumnStudy() {
  return (
    <figure className="roadtrip__autumn-study">
      <svg viewBox="0 0 900 440" role="img" aria-labelledby="autumn-study-title autumn-study-desc">
        <title id="autumn-study-title">Lake Sabrina and Buttermilk Country, an autumn study</title>
        <desc id="autumn-study-desc">An original two-part illustration: golden trees along blue mountain water on the left, and pockets of yellow among dry, boulder-strewn foothills on the right. These are impressions of the two landscapes, not one literal viewpoint.</desc>
        <rect width="900" height="440" fill="#faf4e9" />
        <path d="m0 217 98-106 48 39 91-107 80 114 51-38 102 112 74-59 92-64 75 84 78-36 111 78v206H0Z" fill="#c6beb1" />
        <path d="m146 150 91-107 80 114-64-37-22 19-17-10Z" fill="#f3eee4" />
        <path d="m0 252 92-67 88 71 91-44 97 71 105-62 88 40 95-58 110 64 134-58v231H0Z" fill="#a5a897" />
        <path d="M0 308c82-24 110-12 189-27s129-3 182 12 89 6 169-2v130H0Z" fill="#92adaa" />
        <path d="M13 329c133-11 184-18 292-10m-246 34c142-15 244-8 393-19M122 379c104-6 202-12 303-7" fill="none" stroke="#e6eeDF" strokeWidth="2" />
        <path d="M520 218c99 20 141 75 207 79s104-23 173-5v148H520Z" fill="#d5b997" />
        <path d="M493 326c93-20 177 24 245 37s105 4 162 12v65H470Z" fill="#be9d7a" />
        <path d="M0 399c96-35 177-12 252 1s180 4 288-7v47H0Z" fill="#b9ac8a" />
        <g fill="#e1cfb4" stroke="#a48c6c" strokeWidth="1.5">
          <path d="m593 320 19-24 31 4 13 29-34 9Z" />
          <path d="m741 340 30-28 35 15 8 25-42 7Z" />
          <path d="m837 297 21-18 26 15-1 20-34 1Z" />
          <path d="m670 394 19-18 27 9 7 20-40 4Z" />
        </g>
        {[ [43, 351, .9], [83, 339, 1.1], [126, 346, .8], [351, 315, .75], [389, 306, .95], [429, 318, .8], [568, 280, .75], [608, 275, .6], [703, 308, .7], [809, 350, .9], [853, 362, .7] ].map(([x, y, scale], index) => (
          <g key={x} transform={`translate(${x} ${y}) scale(${scale})`}>
            <path d="M0 39V-32m0 42-14-17M0-2l14-17" fill="none" stroke="#705a43" strokeWidth="2" />
            <ellipse cy="-23" rx="22" ry="36" fill={index % 2 ? '#cba03b' : '#e1be51'} />
            <ellipse cx="-11" cy="-7" rx="15" ry="22" fill="#d9b346" />
            <path d="M0 34V-28m0 27-9-13" fill="none" stroke="#8c7049" strokeWidth="1.3" />
          </g>
        ))}
        <path d="M526 32v376" stroke="#fffaf1" strokeWidth="3" strokeDasharray="2 7" />
        <g fill="#655545" fontSize="16" letterSpacing="2">
          <text x="28" y="34">LAKE SABRINA</text>
          <text x="552" y="34">BUTTERMILK COUNTRY</text>
        </g>
      </svg>
      <figcaption>Yellow by the water; yellow in the dry hills. An original illustration of two impressions, not a literal viewpoint.</figcaption>
    </figure>
  );
}

function TufaStudy() {
  return (
    <figure className="roadtrip__tufa-study">
      <svg viewBox="0 0 900 480" role="img" aria-labelledby="tufa-study-title tufa-study-desc">
        <title id="tufa-study-title">Mono Lake tufa towers, a limestone study</title>
        <desc id="tufa-study-desc">An original illustration of pale, craggy limestone spires with porous surfaces beside blue-green lake water, distant mountains, and a dry shoreline. Tufa forms around underwater freshwater springs; falling lake levels reveal the towers.</desc>
        <defs>
          <linearGradient id="tufa-water" x2="0" y2="1">
            <stop stopColor="#b6c8c2" />
            <stop offset="1" stopColor="#789e9c" />
          </linearGradient>
          <pattern id="tufa-pores" width="31" height="37" patternUnits="userSpaceOnUse">
            <path d="m6 11 2-4 4 1 1 5-4 2Zm14 15 1-5 5 1 1 4-4 3Z" fill="#9d8c70" opacity=".42" />
            <path d="m17 5 5-2m-19 27 5 2m13 1 3-2" stroke="#fff9e9" strokeWidth="2" opacity=".75" />
          </pattern>
        </defs>
        <rect width="900" height="480" fill="#f7efe1" />
        <path d="m0 191 80-31 60 17 102-66 63 47 64-24 92 42 79-31 72 24 93-57 71 52 62-18 62 37v71H0Z" fill="#d2cabe" />
        <path d="m0 216 122-30 98 20 109-24 116 31 130-28 131 25 99-26 95 25v63H0Z" fill="#b5b8ab" />
        <path d="M0 235c164-12 248 7 414-2s314-2 486 9v238H0Z" fill="url(#tufa-water)" />
        <g fill="none" stroke="#edf0e3" strokeWidth="2" opacity=".7">
          <path d="M21 256h119m173-6h154m55 13h111m125-9h115M44 287h78m175-11h70m151 15h104m180-10h76M260 329h103m112 17h127M337 390h194" />
        </g>
        <g fill="#e1d3b6" opacity=".22">
          <path d="m139 382 26 54 28-14 17 34 31-23 27 24 22-74Zm272-74 13 62 16-12 13 21 21-71Zm235 85 32 64 29-19 27 31 35-27 31 13 18-61Z" />
        </g>
        <path d="M0 365c93-23 159 3 221 24s133 39 230 25 183-16 250 4 124 6 199-11v73H0Z" fill="#dcc8a9" />
        <path d="M0 417c91-12 149 18 234 17s125 20 213 12 171-9 244 7 139-8 209-3v30H0Z" fill="#c5ad8b" />
        <g stroke="#aa9779" strokeWidth="1.5" strokeLinejoin="round">
          <g>
            <defs>
              <path id="tufa-left-towers" d="m105 389 7-65 14-9-3-52 13-9 1-46 12-6 7-28 13 13 3 38 13 8 6 54 14-9 2-49 14-9 3-35 12-8 9 18 2 44 14 12 2 48 15 11 9 71Z" />
            </defs>
            <use href="#tufa-left-towers" fill="#e8dcc2" />
            <use href="#tufa-left-towers" fill="url(#tufa-pores)" stroke="none" />
            <path d="m157 192 5 69-9 34 6 79m66-164-9 67 11 34-4 62m-39-85-7 54 7 37" fill="none" opacity=".65" />
            <path d="m130 346 4-16 8-3 5 10-1 14Zm67-31 3-14 8 1 3 12-6 8Zm38 44 3-11 8 2 2 12-9 4Z" fill="#a8987d" stroke="none" />
          </g>
          <g>
            <defs>
              <path id="tufa-water-towers" d="m393 310 7-32 10-5-1-34 9-7 2-27 10-8 8 13 1 31 11 9 2 21 9-5 2-31 9-5 8 10 2 34 10 11 3 25Z" />
            </defs>
            <use href="#tufa-water-towers" fill="#dfd5bb" />
            <use href="#tufa-water-towers" fill="url(#tufa-pores)" stroke="none" />
            <path d="m427 217-3 38 7 19-4 28m43-51-2 44" fill="none" opacity=".6" />
          </g>
          <g>
            <defs>
              <path id="tufa-right-towers" d="m621 407 8-52 13-10-2-45 14-13 2-44 12-8-1-50 13-11 3-27 13-10 10 17-2 36 13 9 4 51 15-8 2-45 12-9 4-32 12-4 9 18-1 37 10 13 4 51 12 9 3 40 14 10 7 76Z" />
            </defs>
            <use href="#tufa-right-towers" fill="#e9ddc3" />
            <use href="#tufa-right-towers" fill="url(#tufa-pores)" stroke="none" />
            <path d="m694 156-8 59 9 32-6 53 5 83m61-200-6 59 9 30-7 56 10 58m-87-134-8 54 8 29-6 48m62-99-9 42 7 45" fill="none" opacity=".65" />
            <path d="m683 238 2-15 8-4 5 12-4 11Zm55 72 3-17 10-3 4 15-7 10Zm-86 49 3-13 9-3 4 13-8 9Zm104 29 3-15 8 1 4 13-7 5Z" fill="#a8987d" stroke="none" />
          </g>
        </g>
        <g fill="none" stroke="#f3efe0" strokeWidth="2" opacity=".8">
          <path d="M383 314c39 6 78 7 120 0m-106 10h38m25 2h30M91 399l48 7m142-9 38 5m298 17 37 5m160-8 45-5" />
        </g>
        <g fill="#9a9279" opacity=".7">
          <path d="m44 428 7-19 2 19 10-12-5 17Zm279 16 6-20 4 20 9-9-4 14Zm517-7 5-19 5 17 9-9-4 15Z" />
        </g>
        <text x="30" y="40" fill="#7e5145" fontSize="14" letterSpacing="3">MONO LAKE / TUFA</text>
      </svg>
      <figcaption>Limestone spires, blue water, and a dry shore. Tufa forms underwater; lower lake levels reveal it.</figcaption>
    </figure>
  );
}

function FlightIcon({ departure = false }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={PLANE_PATH} transform={`rotate(${departure ? 45 : 135} 12 12)`} />
    </svg>
  );
}

function RouteGuide() {
  return (
    <aside className="roadtrip__route" aria-labelledby="roadtrip-route-title">
      <h3 id="roadtrip-route-title">the way north.</h3>
      <div className="roadtrip__airports" role="group" aria-label="Trip airports">
        <p className="roadtrip__eyebrow"><FlightIcon /><span>starting point / Ontario</span></p>
        <p className="roadtrip__eyebrow"><FlightIcon departure /><span>ending point / Reno</span></p>
      </div>
      <figure className="roadtrip__route-map">
        <svg viewBox="0 0 400 760" role="img" aria-labelledby="route-map-title route-map-desc">
          <title id="route-map-title">A regional sketch of the Highway 395 stops</title>
          <desc id="route-map-desc">North is at the top. A plane marks the arrival airport at Ontario at the bottom; another marks the departure airport at Reno, where the road trip ends at the top. Numbered stops include Owens Lake, the visitor center, Mount Whitney, Alabama Hills, Big Pine, the bristlecone pine forest, Bishop, Buttermilk Country, Lake Sabrina, Crowley Lake, Mammoth, June Lake, Mono Lake, Yosemite, Bodie, and Lake Tahoe. Lake Sabrina is southwest of Buttermilk Country, on the eastern side of the Sierra crest. Yosemite and the Bishop Creek lakes branch west from Highway 395. Bodie's road branches east directly from Highway 395, north of Mono Lake, not from stop 13. Whitney is a sighting. The Death Valley arrow is a road connection, not an additional visited stop. This regional sketch is not to scale or for navigation.</desc>
          <path d="M159 688 131 639 146 600 121 563 80 519 55 483 60 437 70 401 105 358 112 323 134 284 119 250 142 211 128 175 152 138 140 109 163 77" data-map-feature="sierra-nevada" fill="none" stroke="#e6dfd3" strokeWidth="38" strokeLinejoin="round" />
          <text x="40" y="540" transform="rotate(-90 40 540)" fill="#9c9181" fontSize="16" letterSpacing="3">SIERRA NEVADA</text>
          <path d="M230 737V650c0-43 11-83 0-130s8-81 0-120-20-45-15-75 18-30 10-59 19-38 10-61-23-85-15-137L230 20" className="roadtrip__map-road" />
          <path d="m230 600-40-12m40-96 40-22 50-15M230 400l-65 20-60 40M235 205l-54 9-42 36-46-5M236 650l141 34" className="roadtrip__map-detour" />
          <path d="M224.139 165 320 135" className="roadtrip__map-detour" data-map-connection="bodie" />
          <text x="263" y="169" fill="#7e5145" fontSize="14">270</text>
          <path d="m369 674 8 10-13 3" fill="none" stroke="#ad8b70" strokeWidth="1.5" />
          <path d="m223 731 7-10 7 10m-14-701 7-10 7 10" fill="none" stroke="#981b20" strokeWidth="1.5" />
          <g data-airport="ONT" fill="#7e5145">
            <path d={PLANE_PATH} transform="translate(75 733) scale(.8) rotate(135 12 12)" />
            <text x="216" y="753" textAnchor="end" fontSize="16">Ontario</text>
          </g>
          <g data-airport="RNO" fill="#7e5145">
            <path d={PLANE_PATH} transform="translate(315 33) scale(.8) rotate(45 12 12)" />
            <text x="250" y="26" fontSize="16">Reno</text>
          </g>
          <path d="M213 47c-10 6-7 15-5 23s-7 16 1 21 21-2 23-11-3-12 0-19-9-18-19-14" fill="#c7d7d2" />
          <ellipse cx="251" cy="190" rx="24" ry="14" fill="#c7d7d2" transform="rotate(-20 251 190)" />
          <ellipse cx="225" cy="365" rx="19" ry="12" fill="#c7d7d2" />
          <ellipse cx="105" cy="460" rx="18" ry="12" fill="#c7d7d2" />
          <ellipse cx="284" cy="700" rx="20" ry="30" fill="#e1d3bc" />
          <path d="m74 646 23-39 24 39" fill="none" stroke="#b3aa99" strokeWidth="2" />
          <g fill="#981b20" stroke="#fff" strokeWidth="2">
            {STOPS.map((stop, index) => (
              <circle key={stop.id} cx={stop.x} cy={stop.y} r="12" data-stop={stop.id}>
                <title>{`${index + 1}. ${stop.name}`}</title>
              </circle>
            ))}
          </g>
          <g fill="#fff" textAnchor="middle" fontSize="13">
            {STOPS.map((stop, index) => <text key={stop.id} x={stop.x} y={stop.y + 4}>{index + 1}</text>)}
          </g>
          <g fill="#655c50" fontSize="18" stroke="#fff" strokeWidth="3" paintOrder="stroke" strokeLinejoin="round">
            {STOPS.map(stop => (
              <text key={stop.id} x={stop.labelX} y={stop.labelY} textAnchor={stop.labelAnchor || 'start'} data-stop-label={stop.id}>
                {stop.mapLines
                  ? stop.mapLines.map((line, index) => <tspan key={line} x={stop.labelX} dy={index ? 20 : 0}>{line}{index < stop.mapLines.length - 1 ? ' ' : ''}</tspan>)
                  : stop.mapName || stop.name}
              </text>
            ))}
          </g>
          <text x="286" y="635" fill="#7e5145" fontSize="16">to Death Valley</text>
          <text x="286" y="655" fill="#7e5145" fontSize="14">via 136 / 190</text>
          <path d="M356 72V34m0 0-6 10m6-10 6 10" fill="none" stroke="#7e5145" />
          <text x="356" y="24" textAnchor="middle" fill="#7e5145" fontSize="16">N</text>
          <rect x="206" y="120" width="36" height="27" rx="6" fill="#fff" stroke="#d4c8b7" />
          <text x="224" y="139" textAnchor="middle" fill="#7e5145" fontSize="14">395</text>
        </svg>
        <figcaption>Regional sketch. Whitney is a sighting; Death Valley is a road connection. Not to scale or for navigation.</figcaption>
      </figure>
      <figure className="roadtrip__detour-map">
        <p className="roadtrip__eyebrow">14 / Yosemite &middot; Tioga Road</p>
        <svg viewBox="0 0 400 380" role="img" aria-labelledby="yosemite-map-title yosemite-map-desc">
          <title id="yosemite-map-title">The Yosemite branch, in the same regional-sketch style</title>
          <desc id="yosemite-map-desc">A westward sequence from Tioga Pass through Tuolumne Meadows, Pothole Dome, Tenaya Lake, Olmsted Point, Siesta Lake, and Tuolumne Grove's Dead Giant Tunnel Tree. Soda Springs branches from Tuolumne Meadows. Schematic, not a road or trail navigation map.</desc>
          <path d="m308 22-47 57-48 38-23 45-52 29-19 53-47 36-23 48" fill="none" stroke="#e6dfd3" strokeWidth="30" strokeLinejoin="round" />
          <path d="m335 35-65 50-50 70-45 45-40 45-40 45-45 50" className="roadtrip__map-road" />
          <path d="m270 85 55 40" className="roadtrip__map-detour" />
          <ellipse cx="175" cy="200" rx="18" ry="10" fill="#c7d7d2" />
          <ellipse cx="95" cy="290" rx="15" ry="9" fill="#c7d7d2" />
          {YOSEMITE_POINTS.map(point => (
            <g key={point.name}>
              <circle cx={point.x} cy={point.y} r="5" fill="#981b20" stroke="#fff" strokeWidth="1.5"><title>{point.name}</title></circle>
              <text x={point.labelX} y={point.labelY} textAnchor={point.anchor || 'start'} fill="#655c50" fontSize="18" stroke="#fff" strokeWidth="3" paintOrder="stroke" strokeLinejoin="round">
                {point.name}
                {point.detail && <tspan x={point.labelX} dy="22" fontSize="15">{point.detail}</tspan>}
              </text>
            </g>
          ))}
        </svg>
        <figcaption>The westward branch in more detail, including Soda Springs and the grove. Not to scale.</figcaption>
      </figure>
      <nav aria-label="Road-trip chapters">
        <ol>
          {STOPS.map((stop, index) => (
            <li key={stop.id}>
              <button type="button" onClick={() => jumpToStop(stop.id)}>
                <span className="roadtrip__stop-number">{String(index + 1).padStart(2, '0')}</span>
                <span>{stop.name}</span>
                {stop.id === 'yosemite' && <span className="roadtrip__detour-label">west</span>}
              </button>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}

function Chapter({ index, children }) {
  const stop = STOPS[index];
  return (
    <section className="roadtrip__chapter" aria-labelledby={stop.id}>
      <p className="roadtrip__chapter-kicker">{String(index + 1).padStart(2, '0')} / {stop.region}</p>
      <h3 id={stop.id} tabIndex={-1}>{stop.name}</h3>
      {children}
    </section>
  );
}

export default function Highway395() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Highway 395 | Shreya Hardas';
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="roadtrip" aria-label="Highway 395 road trip">
      <article aria-labelledby="roadtrip-title">
        <div className="roadtrip__topline">
          <Link to="/blog">&larr; back to the blog</Link>
          <span>road notes 01</span>
        </div>
        <header className="roadtrip__hero">
          <div className="roadtrip__hero-copy">
            <p className="roadtrip__eyebrow">a california road trip</p>
            <h2 id="roadtrip-title">highway<br /><span>395.</span></h2>
            <p className="roadtrip__subtitle">Old earth. Fleeting color.</p>
            <p className="roadtrip__dek">Desert rock, ancient trees, a deep crack in the ground, and lakes that tell very different stories.</p>
            <p className="roadtrip__date">Written <time dateTime="2026-10-29">October 29, 2026</time></p>
          </div>
          <Landscape />
        </header>
        <div className="roadtrip__body">
          <RouteGuide />
          <div className="roadtrip__story">
            <div className="roadtrip__intro">
              <p>The trip started in Ontario. This Highway 395 road trip brought together desert-like landscapes, ancient trees, lakes, and fall-color loops. We saw Mount Whitney and an arch in the Alabama Hills, went off-roading in Big Pine, and found a very different kind of stop in Bishop: Erick Schat's Bakkery and its selection of breads. In Mammoth, there was also a crack in the ground about sixty feet deep.</p>
              <p>Put together, those stops tell a story about time: rock shaped over ages, trees that measure their lives in millennia, and autumn leaves working on a much shorter calendar.</p>
            </div>
            <Chapter index={0}>
              <p>As we approached Alabama Hills, the broad Owens Lake basin was on our right. It was a large presence beside the road, but the name alone does not explain the landscape.</p>
              <p>Beginning in 1913, water from the Owens River was diverted into the Los Angeles Aqueduct to supply the city. That river had been the lake's main inflow. The diversion dried out large parts of the lakebed and left a much smaller area of shallow, highly saline water.</p>
              <p>The exposed bed became a major source of windblown dust. Dust-control work has used shallow flooding, managed vegetation, and gravel to keep that material from becoming airborne. The basin is not simply an untouched desert scene: its water, exposed ground, and management are tied to the demands of a distant city.</p>
            </Chapter>
            <Chapter index={1}>
              <p>The Eastern Sierra Interagency Visitor Center had some amazing exhibits. Its interpretive displays give the landscape outside another layer of context, rather than treating each mountain, lake, and stretch of desert as an isolated sight.</p>
              <p>It sits just south of Lone Pine, at the junction of Highway 395 and State Route 136. From here, 136 heads east and connects with 190 toward Death Valley. The road trip could branch into a very different landscape at this junction.</p>
              <p className="roadtrip__field-note">Road note / Death Valley is a route connection here, not an additional recorded stop on this trip. Check current road conditions before planning that drive.</p>
            </Chapter>
            <Chapter index={2}>
              <p>We also saw Mount Whitney. There is an important word in its superlative: it is the highest peak in the <em>contiguous</em> United States, not the highest across all fifty states.</p>
              <p>The National Park Service gives its summit elevation as 14,505 feet. Seeing the peak belongs in these trip notes as a view of the Sierra skyline, not as a claim that we climbed it. Around Lone Pine, a road trip can put a very large mountain into the story without becoming a mountaineering trip.</p>
              <p className="roadtrip__field-note">Mountain note / Whitney holds the lower-48 record; Denali in Alaska is higher.</p>
            </Chapter>
            <Chapter index={3}>
              <p>The Alabama Hills are a jumble of enormous, rounded boulders. Some are piled together; others sit apart on sandy ground, with low desert scrub in the gaps. Behind those soft, weathered shapes, the Sierra rises in a jagged wall.</p>
              <p>No buildings or trail signs: just rocks, scrub, and open sky. Our car almost felt like the only human-made thing in sight.</p>
              <p>We saw a natural arch among those rocks, a curve of stone framing the landscape beyond. It is the small shapes as much as the scale that make this place worth looking at: cracks across a boulder, a narrow gap between two rocks, a hollow worn into the stone. What looks bare from a distance has plenty going on up close.</p>
              <p className="roadtrip__field-note">Landscape note / rounded hills and natural arches below the Sierra, near Lone Pine. The particular arch is not named in these notes.</p>
            </Chapter>
            <Chapter index={4}>
              <p>At Big Pine, we went off-roading to see volcanic cones. This was a change from the highway itself: a way of seeing the volcanic landscape beyond the main road.</p>
              <p>USGS research describes basaltic lava flows and multiple eruption vents in the Big Pine volcanic field. The cones and lava belong to the Owens Valley's volcanic history, adding another way for rock to take shape alongside the eroded hills and granite farther along the trip.</p>
              <p className="roadtrip__field-note">Volcanic note / off-roading near Big Pine; no specific cone or trail is assumed.</p>
            </Chapter>
            <Chapter index={5}>
              <p>High in the White Mountains, the bristlecone pine forest is an open landscape of pale rock and twisted wood. There is space between the trees, and so much of each trunk can look bare and weathered that a small patch of green needles comes as a surprise. These are not trees that announce their age by being enormous.</p>
              <h4>The pale rock beneath the trees</h4>
              <p>Limestone is close, but much of the pale rock associated with these groves is dolomite, also called dolostone. It is a calcium-magnesium carbonate rock, related to limestone and often formed when magnesium-rich water altered older limestone. Its history begins with ancient carbonate sediments, long before this was a high mountain landscape.</p>
              <p>The carbonate minerals account for the pale whites and grays. Small amounts of other minerals change the palette: iron can give dolomite yellow-brown tones, and oxidation during weathering can leave rusty stains. The color is part of the rock's chemistry, not simply dust sitting on its surface.</p>
              <p>Weathering works on its shape too. Water enters cracks, expands when it freezes, and gradually loosens fragments. Weakly acidic rain and meltwater can also slowly dissolve carbonate rock. The loose, angular pieces underfoot are part of that long breakdown of the mountainside.</p>
              <h4>How a tree survives here</h4>
              <p>Around 10,000 feet up, strong sun comes with cold nights, freezing winters, drying winds, and a short growing season. Moisture and nutrients are scarce. The Great Basin bristlecone pine, <em>Pinus longaeva</em>, is exceptionally well adapted to this combination, though it is not the only tree here: limber pines share the forest.</p>
              <p>Growing slowly produces dense wood that resists insects and decay. Needles can stay on the branches for many years, saving the tree the cost of replacing them each season. Even when much of a trunk has died, a narrow strip of living bark and the tissues beneath it can still connect roots to living branches. A tree can look half-finished, or almost dead, and keep growing for centuries.</p>
              <p>Living trees here exceed 4,000 years of age. Methuselah, one of the best-known bristlecones, is more than 4,800 years old; its exact location is not marked, to protect it. The remarkable thing is not just that wood has lasted that long, but that the same individual tree is still alive.</p>
              <h4>Muir, Schulman, and the trees' memory</h4>
              <p>Across Owens Valley lies the Sierra Nevada, whose forests John Muir helped people see as places worth protecting. His writing and conservation work belong to the wider history of these mountain landscapes. The scientific story of the White Mountains' ancient pines, however, belongs especially to Edmund Schulman, whose tree-ring research in the 1950s revealed their extraordinary ages.</p>
              <p>The widths of growth rings preserve clues to good and difficult growing seasons. Matching patterns in living trees and preserved dead wood lets researchers reconstruct climate across thousands of years. Even a fallen piece of wood can be part of that record, which is one more reason to leave it where it lies.</p>
              <h4>The visitor center &amp; Discovery Trail</h4>
              <p>Schulman Grove has a seasonal visitor center with exhibits, a film, and information about both the trees and the researchers who studied them. The Discovery Trail starts by the visitor center and makes a one-mile loop through the grove. Allow about an hour, with time to stop at the trees and interpretive signs; the altitude can make even a short walk feel slower.</p>
              <p>This is the short Discovery loop, not the separate 4.5-mile Methuselah Trail. Bring water and layers, and check seasonal access before heading up.</p>
            </Chapter>
            <Chapter index={6}>
              <p>After so much open country, Bishop felt like a substantial town: a busy Main Street, businesses, and neighborhoods, not just a stop beside the highway. It is a regional hub in the northern Owens Valley, and that concentration of everyday life feels surprising against the dry country around it.</p>
              <p>Water helps explain the contrast. Bishop Creek carries water down from the Sierra, while the city's drinking water is pumped from groundwater wells. The mountains and the water beneath the valley make it possible for a town to thrive in a landscape that can look so dry from the road.</p>
              <p>One interesting find was Erick Schat's Bakkery. Its predecessor bakery was founded by the Schoch family in 1903; the Dutch Schat family later took over and carried on the Basque sheepherder-bread tradition. There is a longer history behind those shelves than a quick bakery stop might suggest.</p>
              <p>The choice of breads is part of the attraction: Original Sheepherder Bread, sourdough, rye, olive, French, and seven-grain, among others. After all the open space outside, here was a different sort of abundance.</p>
            </Chapter>
            <Chapter index={7}>
              <p>West of Bishop, Buttermilk Country brought another version of fall: beautiful yellow color set against dry mountains. It did not need a dense forest around it. Small patches of yellow could stand out all the more against that spare, earthy background.</p>
              <p>This belongs with the Lake Sabrina side trip, away from the northbound highway and toward the Sierra. The landscape changes before the lake itself comes into view.</p>
            </Chapter>
            <Chapter index={8}>
              <p>At Lake Sabrina, there was beautiful yellow fall color around the water. After the dry mountains and Buttermilk Country, the lake gathered those colors into a different setting: mountain slopes, water, and bright leaves along the edge.</p>
              <p>Lake Sabrina lies up Bishop Creek Canyon, west of Bishop on Highway 168. The Bishop area's fall-color landscapes include aspens, willows, and cottonwoods, although a yellow leaf alone is not enough to name the tree in a particular memory.</p>
              <AutumnStudy />
            </Chapter>
            <Chapter index={9}>
              <p>Crowley Lake brings broad, open water into the Long Valley landscape. It is known for fishing and boating, but there is also a geological reason to look more closely at its shore.</p>
              <p>Along the northeastern shore are pale stone columns in volcanic tuff, a rock made from volcanic ash. A study published in <em>Geology</em> links the columns to water circulating through the cooling deposit. Mineral cement made the columns more resistant; erosion could then remove the softer material around them.</p>
              <p>They are not the same kind of formation as Mono Lake's tufa towers farther north. Similar-looking pale stone can have very different beginnings: cooling volcanic ash here, spring-water chemistry there.</p>
              <p className="roadtrip__field-note">Lake note / the columns are context for what is at Crowley, not a claim that we reached that shoreline. Access depends on water levels and conditions.</p>
            </Chapter>
            <Chapter index={10}>
              <p>Mammoth Lakes deserves the plural. Above town, the Lakes Basin gathers Twin Lakes, Lake Mary, Lake Mamie, Lake George, and Horseshoe Lake into a landscape of forest, water, and steep mountain slopes. They are separate lakes with different settings, not several names for the same stretch of water.</p>
              <p>Twin Lakes sits lower in the basin; farther up are the broader water of Lake Mary, smaller Lake Mamie, and Lake George below the rocky slopes. Horseshoe Lake lies near the end of Lake Mary Road. Together they make this a lake-country branch of the trip, not just the location of the fissure.</p>
              <h4>Why are the trees dead beside Horseshoe Lake?</h4>
              <p>A stand of dead trees beside a mountain lake might make you think of fire or drought. Here, the explanation is something you cannot see: volcanic carbon dioxide rising from beneath Mammoth Mountain.</p>
              <p>The gas moves upward through fractures and can build up in the soil. Leaves use carbon dioxide, but roots still need oxygen. High concentrations of CO<sub>2</sub> around the roots deprive them of oxygen and interfere with nutrient uptake, killing the trees even though water is close by.</p>
              <p>Forest Service staff noticed the die-off around 1990, after an earthquake swarm beneath the mountain in 1989. USGS investigations linked it to gas escaping from the volcanic system. This is a localized ground-gas hazard, not a description of the air around every lake in Mammoth.</p>
              <p className="roadtrip__field-note">The gas is invisible and odorless, and can collect in hollows or beneath snow. Respect warning signs and closures; do not enter tree-kill areas or investigate pits and snow caves.</p>
              <h4>Earthquake Fault</h4>
              <p>At Mammoth's Earthquake Fault, I saw a deep line in the ground. The sixty-foot detail is real: the Forest Service describes a fissure up to sixty feet deep and ten feet wide.</p>
              <p>The name needs a small correction. It is not technically a true fault, because the rock on either side has not shifted much relative to the other. The opening cuts through volcanic rhyolite, with tectonic stretching implicated in its formation.</p>
              <p>A crack in the ground sounds like a small detail. Sixty feet changes the scale of that sentence.</p>
            </Chapter>
            <Chapter index={11}>
              <p>June Lake Loop adds a different shape to the route: not a single stop, but a road that gathers several lakes into one small circuit.</p>
              <p>Highway 158 passes June, Gull, Silver, and Grant lakes. In autumn, the loop's aspens add another layer to the mountain-and-water landscape.</p>
              <p>Fall color was part of my road trip too. Here the story changes scale again: from the long lives of bristlecones to leaves that belong to a single season.</p>
              <p className="roadtrip__field-note">Loop tip / To start from the north, leave Highway 395 at the northern Highway 158 junction near Grant Lake. Follow the loop past Grant, Silver, Gull, and June lakes, then rejoin 395 at the southern junction. The northern stretch closes seasonally for snow, so check road conditions before choosing this approach.</p>
            </Chapter>
            <div className="roadtrip__pause">
              <p>Some landscapes keep time in stone.<br />Others, in a season.</p>
            </div>
            <Chapter index={12}>
              <p>The Mono Basin Scenic Area Visitor Center, just north of Lee Vining, offers a magnificent view over Mono Lake. The Mono Basin is the surrounding watershed: Sierra snowmelt drains toward this salt lake, which has no outlet to the ocean.</p>
              <p>There is volcanic history in that view too. Black Point, now on the northwestern shore, formed in an underwater eruption about 13,300 years ago, near the end of the last Ice Age, when the lake was much higher. The islands within the lake, Negit and Paoha, also have volcanic origins, but are much younger.</p>
              <p>The calcium deposits I saw at Mono Lake have a name: tufa. They are calcium-carbonate limestone formations, with a much more interesting origin than water simply drying up and leaving rock behind.</p>
              <p>The towers grow underwater, where calcium-rich freshwater springs meet the lake's carbonate-rich water. The chemical reaction deposits limestone around the springs. Lower lake levels expose the towers; they do not create them.</p>
              <TufaStudy />
              <p className="roadtrip__field-note">Water note / tufa grows underwater; exposed towers are fragile.</p>
              <h4>Why is the water so salty?</h4>
              <p>With no outlet, water leaves through evaporation while salts stay behind. In 1941, Los Angeles began diverting freshwater from the streams feeding Mono Lake to supply its growing population. It was the incoming stream water, not the salty lake water, that went south. Over the next forty years, the lake fell about 45 feet, lost half its volume, and doubled in salinity.</p>
              <p>The water is roughly two and a half times as salty as the ocean, saltier even than the Red Sea. Those dissolved salts also make it denser than ordinary seawater, so swimmers float more easily. Salinity changes with the lake level; limits on diversions now help protect the lake and its wildlife.</p>
              <h4>What can live in water this salty?</h4>
              <p>No fish live in Mono Lake, but it is far from lifeless. Brine shrimp and alkali flies thrive here, feeding on algae and becoming food for millions of migratory birds. Algae and other microorganisms are part of the lake's living world too: this is an unusual food web, not an empty lake.</p>
              <p>The alkali flies have an especially lovely trick. Tiny hairs trap a bubble of air around their bodies, letting the adults walk underwater to feed and lay eggs.</p>
            </Chapter>
            <Chapter index={13}>
              <p>Yosemite was a spectacular westward branch off Highway 395. Tioga Pass and Tioga Road deserve to be part of the destination, not just the directions for getting there.</p>
              <h4>Tioga Pass &amp; Tuolumne Meadows</h4>
              <p>From the eastern side, Highway 120 climbs toward Tioga Pass and continues into Yosemite. The park's 47-mile stretch of Tioga Road runs between the pass and Crane Flat, through a landscape of granite, lakes, forest, and open meadows.</p>
              <p>Tuolumne Meadows opens up around the winding Tuolumne River. Nearby Soda Springs adds a much smaller water feature: naturally carbonated, cold water bubbling out of the ground. The river and the springs are different things, both part of this high-country landscape.</p>
              <h4>Pothole Dome</h4>
              <p>We hiked Pothole Dome, at the western end of Tuolumne Meadows. A granite dome changes the way the meadow reads: the open country can be seen as a whole, with the surrounding peaks giving it a frame.</p>
              <h4>Tenaya Lake &amp; Olmsted Point</h4>
              <p>Continuing west along the road brings Tenaya Lake, held among granite domes and peaks. Olmsted Point offers a different angle on that same granite country, with views toward Half Dome, Clouds Rest, and Tenaya Lake.</p>
              <p>The boulders scattered across the rock at Olmsted Point include glacial erratics, carried and left behind by ice. Yosemite's granite is not just a collection of dramatic shapes; it also preserves clues to how those shapes were worn and rearranged.</p>
              <h4>Siesta Lake</h4>
              <p>Siesta Lake had pretty yellow fall plants and bushes around the water. It was a smaller detail than the big granite views, but it belongs just as much in the memory of the road: a lake with a yellow fringe.</p>
              <p>The lake sits beside Tioga Road, farther west toward Crane Flat. Here, too, autumn brought its short-lived color into a landscape shaped over much longer stretches of time.</p>
              <h4>Tuolumne Grove &amp; the Dead Giant Tunnel Tree</h4>
              <p>The Dead Giant Tunnel Tree belongs to Tuolumne Grove, near the western end of this branch. A tunnel cut through an already-dead giant sequoia turned the enormous trunk into a passage, a very different kind of opening from the natural arch in Alabama Hills.</p>
              <p>The grove also has living giant sequoias. The old Big Oak Flat Road into it is now closed to vehicles; this is a place reached on foot, not a drive-through tree stop.</p>
              <p className="roadtrip__field-note">High-country note / Tioga Road is seasonal. The close-up map follows the locations east to west, not a recorded driving track.</p>
            </Chapter>
            <Chapter index={14}>
              <p>Bodie State Historic Park was a deeper detour into the hills, away from the highway. State Route 270 branches east from Highway 395 toward the town. Its isolation is part of the ghost town's presence: a mining town standing apart from the main road, rather than another settlement strung along it.</p>
              <p>The reason for a town here was gold. A discovery in 1859 began the story, and rich ore finds in the 1870s brought the boom. Mines drew people, and the businesses of a town followed: houses, shops, hotels, saloons, and a school.</p>
              <p>Bodie's violent reputation has a historical basis. The National Park Service describes shootings, stabbings, and brawls associated with its boomtown nightlife and gambling. But violence was not the whole town: families, workers, and a Chinese community also made lives here. It was a place people lived, not simply a set for a Western.</p>
              <p>As mining declined, the town emptied. California State Parks now preserves what remains in a state of &ldquo;arrested decay&rdquo;: keeping the old buildings from disappearing without rebuilding them into a polished version of the past.</p>
              <p className="roadtrip__field-note">Ghost-town note / Bodie's approach is remote, and road access is weather-dependent. Check State Parks guidance before going.</p>
            </Chapter>
            <Chapter index={15}>
              <p>Lake Tahoe is North America's largest alpine lake and the second-deepest lake in the United States, reaching 1,645 feet (501 metres). Be sure to paddle in its crystal-clear water. Its blue water and mountain backdrop made a lovely setting for our fall-color loops, before the trip ended in Reno.</p>
            </Chapter>
            <footer className="roadtrip__footer">
              <details>
                <summary>Sources &amp; design notes</summary>
                <p>The places and observations come from my trip notes. Geological context comes from the sources below; it does not add unrecorded hikes, viewpoints, dates, or experiences.</p>
                <ul>
                  {SOURCES.map(([name, publisher, url]) => (
                    <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{name}</a> <span>/ {publisher}</span></li>
                  ))}
                </ul>
                <p>Layout references: <a href="https://github.com/procedular/react-d3-travel-blog" target="_blank" rel="noopener noreferrer">react-d3-travel-blog</a> (map-led storytelling) and <a href="https://github.com/statichunt/iwriter-hugo" target="_blank" rel="noopener noreferrer">iWriter Hugo</a> (editorial article layout). Both code licenses were verified as MIT. This page is an original React/CSS implementation with original SVG artwork; no template photographs or assets are used.</p>
                <p>MIT notices are retained in <a href="/THIRD-PARTY-NOTICES.txt" target="_blank" rel="noopener noreferrer">third-party notices</a>. Titles use the site's existing DM Serif Display; the story uses Georgia.</p>
              </details>
              <Link to="/blog">&larr; back to the blog</Link>
            </footer>
          </div>
        </div>
      </article>
    </main>
  );
}
