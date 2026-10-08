// All content is taken from the "ARJUNA Sapta Krishi Modular Grand Challenge 2026–27"
// proposal (v1.0, draft for partner review). Keep this file in sync with the PDF in /public.

export const PDF_URL = '/Arjuna_Sapta_Krishi_Modular_Challenge.pdf'
export const PDF_SIZE = '170 KB'
export const PDF_PAGES = 21

// Proposed launch: 9–10 October 2026, IST.
export const LAUNCH_AT = new Date('2026-10-09T09:30:00+05:30')

// Launch-ceremony screen with the big launch button.
//   'url'      – only at /?launch (for the event); everyone else sees the site directly
//   'everyone' – every visitor sees the launch screen first
//   'off'      – never shown, not even at /?launch
export const LAUNCH_SCREEN: 'url' | 'everyone' | 'off' = 'url'

export function showLaunchScreen() {
  if (LAUNCH_SCREEN === 'off') return false
  if (LAUNCH_SCREEN === 'everyone') return true
  return new URLSearchParams(window.location.search).has('launch')
}

export type KitKind = 'kit1' | 'mixed' | 'kit2'

export const KIT_LABEL: Record<KitKind, string> = {
  kit1: 'Kit 1',
  mixed: 'Kit 1 + module, or Kit 2',
  kit2: 'Kit 2',
}

export type Score = { label: string; points: number; bonus?: boolean }

export type Module = {
  id: string
  code: string
  name: string
  title: string
  kit: KitKind
  league: string
  problem: string
  brief: string
  arena: string
  tasksLabel: string
  tasks: string[]
  twists?: string
  tiers?: { bronze: string; silver: string; gold: string }
  scoring: Score[]
}

export const MODULES: Module[] = [
  {
    id: 'k1',
    code: 'K1',
    name: 'Drishti',
    title: 'Complete plant health detection',
    kit: 'kit1',
    league: 'ARJUNA League',
    problem: 'Late detection of disease, pests, nutrient and water stress',
    brief:
      'Using only its on-board camera, ARJUNA patrols crop beds and produces a complete health card for every plant: leaf, stem, fruit, growth and stress, so the farmer knows exactly what to do.',
    arena:
      'Raised beds or pots with around 40 plants (tomato, chilli, brinjal, beans) in mixed conditions, prepared and verified by agronomists.',
    tasksLabel: 'The robot reports, for every plant',
    tasks: [
      'Leaf condition: spots, blight, curl, mosaic, powdery coating, pest holes',
      'Nutrient status: yellowing patterns suggesting N, K or other deficiencies',
      'Water status: wilting, drooping, dry soil vs. waterlogging',
      'Pests: visible insects, eggs, webbing, sticky residue',
      'Growth: plant height and canopy size from depth data',
      'Fruit and flower count, damaged or diseased fruit',
      'A 0–10 health score with the top recommended action',
    ],
    tiers: {
      bronze: 'Single crop, clear symptoms, labels on pots',
      silver: 'Mixed crops, early-stage symptoms, some occlusion',
      gold: 'Unlabelled positions, look-alike symptoms, changing light, plants moved between runs',
    },
    scoring: [
      { label: 'Problem detection accuracy', points: 35 },
      { label: 'Coverage and navigation', points: 15 },
      { label: 'Plant and position assignment', points: 10 },
      { label: 'Growth measurement accuracy', points: 10 },
      { label: 'Robustness to twists', points: 10 },
      { label: 'Health-card clarity for farmers', points: 10 },
      { label: 'Edge efficiency, no cloud', points: 10 },
    ],
  },
  {
    id: 'k2',
    code: 'K2',
    name: 'Vahan',
    title: 'Field transport of goods',
    kit: 'kit1',
    league: 'ARJUNA League',
    problem: 'Workers carrying heavy loads over long, uneven farm paths',
    brief:
      'Farm workers spend hours carrying fertiliser bags, seed trays, tools and harvest crates. ARJUNA becomes a smart farm carrier that takes delivery orders, follows workers on request and moves goods safely.',
    arena:
      'A farm track with a gentle slope, speed bumps, loose soil, a narrow bund-like path and loading points at the store, field and pack-house.',
    tasksLabel: 'Tasks',
    tasks: [
      'Delivery orders, e.g. “Take 2 seed trays from the store to Bed 4”',
      'Follow-me: track one worker in a group, stop when they stop',
      'Milk-run: plan the shortest route for several orders with limited capacity',
      'The Lassi Test: carry an open glass of water across the track without spilling',
      'Load check: confirm the right item was loaded using the camera',
    ],
    twists:
      'A gate closes, a cow-sized obstacle appears, the destination changes mid-route, the path turns muddy, and a second worker in similar clothes walks beside the one being followed.',
    scoring: [
      { label: 'Orders delivered correctly and on time', points: 30 },
      { label: 'Route efficiency and capacity planning', points: 15 },
      { label: 'Follow-me accuracy', points: 15 },
      { label: 'Lassi Test spill score', points: 10 },
      { label: 'Load verification by camera', points: 10 },
      { label: 'Safety around people and obstacles', points: 10 },
      { label: 'Robustness and recovery', points: 10 },
    ],
  },
  {
    id: 'k3',
    code: 'K3',
    name: 'Nirai',
    title: 'Mechanical weeding',
    kit: 'mixed',
    league: 'ARJUNA or Jetrick Build League',
    problem: 'Weeding is labour-heavy; herbicide overuse harms soil and health',
    brief:
      'Find weeds among young crops and remove them mechanically, without harming the crop. No chemical sprays.',
    arena:
      'Soil beds with seedlings in rows (onion, maize or vegetables) and weeds both between rows and right next to crop plants, the hardest case.',
    tasksLabel: 'Rules',
    tasks: [
      'Mechanical or physical removal only',
      'Damaged or uprooted crop plants are heavily penalised',
      'Rotating tine, pull-gripper, cutter, flame-free thermal or another approved method',
      'Blades are guarded and stop instantly on E-stop',
    ],
    twists:
      'Gold tier adds weeds that look like the crop (grass weeds among maize), weeds touching crop stems, uneven rows and wet soil.',
    scoring: [
      { label: 'Weeds removed, roots included', points: 30 },
      { label: 'Crop safety', points: 25 },
      { label: 'Weed vs. crop recognition', points: 15 },
      { label: 'Coverage and speed', points: 10 },
      { label: 'Mechanism design, durability, cost', points: 10 },
      { label: 'Modularity: KMI fit, quick mount', points: 10 },
    ],
  },
  {
    id: 'k4',
    code: 'K4',
    name: 'Buvai',
    title: 'Precision seeding',
    kit: 'mixed',
    league: 'ARJUNA or Jetrick Build League',
    problem: 'Uneven seed spacing and depth reduce yield and waste seed',
    brief:
      'Sow seeds at the right spacing, depth and count along straight rows, and record exactly where every seed went.',
    arena:
      'A prepared soil bed with marked boundaries. Larger seeds such as maize, groundnut or beans for the first edition. Hidden stones and an existing plant patch must be avoided.',
    tasksLabel: 'Tasks',
    tasks: [
      'Sow N rows at the specified row and plant spacing',
      'Place each seed at the target depth and cover it',
      'Exactly one seed per spot: doubles and misses are counted',
      'Skip stones and existing plants, and mark them on the map',
      'Publish a seed map with the position of every seed',
      'Ankur bonus: germination is counted 7–10 days later',
    ],
    scoring: [
      { label: 'Spacing accuracy', points: 25 },
      { label: 'Depth accuracy', points: 20 },
      { label: 'Mechanism design, cost, modularity', points: 20 },
      { label: 'Singulation', points: 15 },
      { label: 'Seed-map accuracy', points: 10 },
      { label: 'Obstacle handling', points: 10 },
      { label: 'Ankur germination bonus', points: 5, bonus: true },
    ],
  },
  {
    id: 'k5',
    code: 'K5',
    name: 'Adike Aarohi',
    title: 'Arecanut tree climber',
    kit: 'kit2',
    league: 'Jetrick Build League',
    problem: 'Dangerous climbing for spraying and harvesting; scarce skilled climbers',
    brief:
      'In the arecanut plantations of Karnataka, Kerala and the North-East, workers climb tall, slender palms to spray against fruit rot and to harvest. The robot must climb, inspect, spray and harvest, safely.',
    arena:
      'Real arecanut logs or bark-textured poles fixed at 6–8 m with fall-arrest netting, dummy bunches near the top. The finale may use real palms at a partner plantation.',
    tasksLabel: 'Tasks',
    tasks: [
      'Mount on the trunk and climb to the crown',
      'Detect and count bunches; classify ripe (yellow–orange) vs. unripe (green)',
      'Spray only the target bunches, measured with water-sensitive cards',
      'Cut the ripe bunch only and lower it on a rope or in a basket',
      'Descend under control and report what it saw',
    ],
    twists:
      'Trunk diameter changes with height, a wet monsoon section, a bulge or scar, wind from a fan, a no-climb zone mid-trunk, and in Gold tier a bunch that looks ripe but is not.',
    scoring: [
      { label: 'Climb success and height reached', points: 20 },
      { label: 'Harvest: correct bunch, safely lowered', points: 20 },
      { label: 'Grip stability, controlled descent', points: 15 },
      { label: 'Bunch detection and ripeness', points: 15 },
      { label: 'Spray accuracy', points: 15 },
      { label: 'Weight, set-up time, cost', points: 15 },
    ],
  },
  {
    id: 'k6',
    code: 'K6',
    name: 'Kalpa Aarohi',
    title: 'Coconut tree climber',
    kit: 'kit2',
    league: 'Jetrick Build League',
    problem: 'Shortage of coconut climbers; risk of falls; delayed harvest',
    brief:
      'The coconut palm, the Kalpavriksha, supports millions of farmers, but trained climbers are scarce. The robot climbs thicker, often curved trunks, picks the right nuts and brings them down without cracking them.',
    arena:
      'Thicker test trunks with leaf-scar rings, including one inclined trunk, and a simulated crown with fronds and dummy nuts at tender and mature stages.',
    tasksLabel: 'Tasks',
    tasks: [
      'Climb past frond bases into the crown without getting stuck',
      'Order-based harvest: “Bring 3 tender coconuts” or “Bring 1 mature bunch”',
      'Cut and lower in a net or basket; dropped nuts are penalised',
      'Photograph the crown and report damaged fronds, holes or pest marks',
      'Descend and hand the harvest to the K2 transport robot',
    ],
    twists:
      'An inclined trunk, a dry frond blocking the path, nuts on the far side of the crown, a mixed bunch, a sudden gust.',
    scoring: [
      { label: 'Climb on vertical and inclined trunks', points: 20 },
      { label: 'Correct nut selection', points: 20 },
      { label: 'Safe cutting and lowering', points: 20 },
      { label: 'Weight, set-up time, cost', points: 20 },
      { label: 'Crown navigation', points: 10 },
      { label: 'Crown health report', points: 10 },
    ],
  },
  {
    id: 'k7',
    code: 'K7',
    name: 'Jal Mitra',
    title: 'River-weed cleaner',
    kit: 'kit2',
    league: 'Jetrick Build League',
    problem: 'Water hyacinth and floating weeds choking lakes, rivers and canals',
    brief:
      'Floating weeds spread fast across Indian lakes and irrigation canals, blocking flow, harming fish and breeding mosquitoes. The robot floats, finds the weed, collects it and brings it to shore, while separating plastic.',
    arena:
      'A test pool or canal section with artificial weed mats, floating plastic, buoys marking a no-go zone, and pumps or fans creating current and wind.',
    tasksLabel: 'Tasks',
    tasks: [
      'Launch from the shore station and map the weed patches',
      'Collect weed into an on-board store by conveyor, rake, net or your own design',
      'Separate plastic from weed into a different compartment',
      'Return and unload into the correct bins before the store overflows',
      'Avoid buoys, wildlife decoys and protected water plants',
      'Report area cleared, weight collected, plastic count and remaining weed',
    ],
    twists:
      'The current reverses, a weed mat tangles the propeller, a floating log blocks the route, the battery runs low, sun glare hits the water.',
    scoring: [
      { label: 'Weed collected', points: 30 },
      { label: 'Navigation on water', points: 15 },
      { label: 'Waterproofing, stability, recovery', points: 15 },
      { label: 'Plastic separation accuracy', points: 10 },
      { label: 'Shore unloading and cycle efficiency', points: 10 },
      { label: 'Environmental care', points: 10 },
      { label: 'Cost for panchayats and water bodies', points: 10 },
    ],
  },
]

export const KMI_LAYERS = [
  { name: 'Mechanical', text: 'Standard mounting pattern and quick-release fixing on ARJUNA’s top plate or rear hitch.' },
  { name: 'Power', text: 'Defined voltage and current limits. Modules draw power safely or carry their own battery.' },
  { name: 'Safety', text: 'Every module joins the emergency-stop chain. Pressing E-stop stops the tool too.' },
  { name: 'Data', text: 'ROS 2 link between Orin and Jetrick with standard start, stop, status and tool-data topics.' },
  { name: 'Identity', text: 'Each module announces a descriptor: ID, type, capabilities and limits.' },
  { name: 'Auto-configure', text: 'ARJUNA detects the module and loads the matching behaviour automatically.' },
]

export const LEAGUES = [
  {
    name: 'ARJUNA League',
    kit: 'Kit 1, fixed hardware',
    for: 'For AI, computer vision and software teams',
    points: ['K1 Drishti and K2 Vahan', 'Software, AI and autonomy focus', 'Optional K3 or K4 using a KMI tool'],
  },
  {
    name: 'Jetrick Build League',
    kit: 'Kit 2, design your own body',
    for: 'For mechanical and mechatronics teams',
    points: ['Any of K3 to K7', 'Mechanism, control and autonomy', 'Cost and robustness matter'],
  },
  {
    name: 'Sapta Krishi Grand League',
    kit: 'Both kits, integrated',
    for: 'The grand challenge',
    points: ['At least three modules across both kits', 'KMI Pit Stop swap challenge', 'Krishi Mela Farm Day finale'],
  },
]

export const AUTONOMY = [
  { level: 'Full autonomy', text: 'A human only starts the run and handles safety.', mult: 1.0 },
  { level: 'Supervised autonomy', text: 'A human may confirm a key decision, such as “cut this bunch?”. Logged.', mult: 0.8 },
  { level: 'Assisted tele-operation', text: 'A human drives; the robot handles low-level control. Bronze tier only.', mult: 0.5 },
]

export const FARM_DAY = [
  { time: 'Morning', what: 'K4 sows the seed bed while K2 brings seed trays from the store.', handoff: 'K2 to K4' },
  { time: 'Mid-morning', what: 'K1 patrols the crop beds and flags weedy and unhealthy plants.', handoff: 'K1 map to K3' },
  { time: 'Late morning', what: 'Pit Stop: ARJUNA swaps to K3 and weeds the beds K1 flagged.', handoff: 'KMI swap' },
  { time: 'Noon', what: 'K5 and K6 climb the palms and lower the harvest into a crate.', handoff: 'K5/K6 to K2' },
  { time: 'Afternoon', what: 'K2 collects the plantation harvest and delivers it to the pack-house.', handoff: 'K2 to store' },
  { time: 'All day', what: 'K7 clears the irrigation canal so water reaches the beds.', handoff: 'K7 to farm report' },
  { time: 'Surprise', what: 'Mela Mayhem: a rain shower, a blocked path or a breakdown forces everyone to re-plan.', handoff: 'Everyone' },
]

export const STAGES = [
  { when: '9–10 Oct 2026', name: 'Launch', text: 'Challenge reveal, ARJUNA and Jetrick demonstrations, module showcase. Registration opens.' },
  { when: 'Oct – Nov 2026', name: 'Registration and module selection', text: 'Teams choose their league and modules.' },
  { when: 'Nov 2026', name: 'Onboarding bootcamps', text: 'ROS 2, Orin and OAK-D, Jetrick, KMI, mechanism design and farm safety, plus plantation and lake field visits.' },
  { when: 'Nov – Dec 2026', name: 'Simulation and design review', text: 'Kit 1 teams submit to the simulator; Kit 2 teams submit designs.' },
  { when: 'Dec 2026', name: 'Kit allocation', text: 'Shortlisted teams receive kits on loan or booked lab access at NMIT.' },
  { when: 'Dec 2026 – Feb 2027', name: 'Build and test', text: 'Hardware builds, practice arenas, mentor sessions and safety inspections.' },
  { when: 'Feb 2027', name: 'Module trials', text: 'Each module’s arena opens for scored Bronze and Silver qualification runs.' },
  { when: 'Mar 2027', name: 'Module finals', text: 'Gold-tier runs decide module champions and select Grand League teams.' },
  { when: 'Apr 2027', name: 'Krishi Mela Farm Day', text: 'Pit Stop, the integrated Farm Day and awards.' },
]

export const AWARDS = [
  { name: 'Sapta Krishi Champion', text: 'Highest overall Grand League score' },
  { name: 'Module Champions', text: 'Best team in each of K1 to K7, seven in all' },
  { name: 'Pit Stop Award', text: 'Fastest, safest KMI module swap' },
  { name: 'Aarohi Award', text: 'Best climbing mechanism in K5 or K6' },
  { name: 'Jal Rakshak Award', text: 'Most effective, eco-friendly water robot' },
  { name: 'Sahyog Award', text: 'Best multi-robot hand-offs on Farm Day' },
  { name: 'Kisan Jugaad Award', text: 'Best performance per rupee' },
  { name: 'Open Krishi Award', text: 'Best open-source design or dataset' },
  { name: 'Best Student Innovation', text: 'Outstanding student-led team' },
  { name: 'Best Startup Pathway', text: 'Strongest route to a real product' },
]

export const CHAMPION_SCORING: Score[] = [
  { label: 'Best three module scores', points: 50 },
  { label: 'Krishi Mela Farm Day', points: 25 },
  { label: 'KMI Pit Stop', points: 10 },
  { label: 'Modularity and reuse', points: 10 },
  { label: 'Affordability and farmer impact', points: 5 },
]

export const TEAMS = [
  { name: 'Students', text: 'Undergraduate and postgraduate teams' },
  { name: 'Researchers', text: 'Universities and research institutes, including agricultural universities' },
  { name: 'Startups', text: 'Agri-tech and robotics startups' },
  { name: 'Industry', text: 'Corporate R&D teams' },
  { name: 'Open and farmer-innovators', text: 'Independent makers and farmer-innovators' },
]
