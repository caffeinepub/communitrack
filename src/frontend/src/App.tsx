import {
  Activity,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Banknote,
  BarChart3,
  Bot,
  Brain,
  CircleDot,
  Cpu,
  Crown,
  DollarSign,
  Dumbbell,
  Eye,
  EyeOff,
  Filter,
  FilterX,
  Globe,
  Heart,
  HeartHandshake,
  IndianRupee,
  Layers,
  LayoutGrid,
  Maximize2,
  Minimize2,
  Music2,
  Palette,
  PanelLeft,
  PanelLeftClose,
  PanelRight,
  PanelRightClose,
  Rocket,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  Star,
  Sun,
  Table2,
  Tag,
  Target,
  Telescope,
  TrendingUp,
  Trophy,
  Upload,
  Users,
  Wand2,
  X,
} from "lucide-react";
import type React from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  Brush,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// --- SEED DATA ---
const DISCOVERY_CSV = `community_name,price,community_url,total_members
That Pickleball School,$49/month,https://www.skool.com/thatpickleballschool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.3k Members • $49/month
AI Automation Society,Free,https://www.skool.com/ai-automation-society/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,314.4k Members • Free
Calligraphy Skool,Free,https://www.skool.com/calligraphy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • Free
Ina's Dance Academy,$149/month,https://www.skool.com/inasdanceacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,436 Members • $149/month
Skoolers,Free,https://www.skool.com/skoolers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,191.8k Members • Free
The Lady Change,$37/month,https://www.skool.com/theladychange/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.1k Members • $37/month
The Aspinall Way,Free,https://www.skool.com/theaspinallway/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,29.5k Members • Free
Zero To Founder by Tom Bilyeu,$119/month,https://www.skool.com/tom-bilyeu/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.4k Members • $119/month
Day by Day Wellness Club,Free,https://www.skool.com/day-by-day-family-4722/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,61.3k Members • Free
Unison Producer Growth Hub,Free,https://www.skool.com/unison-producer-growth-hub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,44.6k Members • Free
The Acting Lab,$199/month,https://www.skool.com/the-acting-lab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,168 Members • $199/month
School of Mentors,$25/month,https://www.skool.com/schoolofmentors/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.6k Members • $25/month
Pocket Singers Free,Free,https://www.skool.com/pocketsingersfree/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17.4k Members • Free
Dating With Gracie,"$6,000/year",https://www.skool.com/dating/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"91 Members • $6,000/year"
TFW Global,$35/month,https://www.skool.com/trading-for-women/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.3k Members • $35/month
ACQ VANTAGE,"$1,000/month",https://www.skool.com/acq/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"857 Members • $1,000/month"
Bourbonado Community,Free,https://www.skool.com/bourbonado/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.3k Members • Free
REVENUE REVOLUTION,Free,https://www.skool.com/revenuerevolution/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7.1k Members • Free
The Kingdom Lounge,Free,https://www.skool.com/the-kingdom-lounge/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4k Members • Free
Synthesizer: Free Skool Growth,Free,https://www.skool.com/synthesizer/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,39.3k Members • Free
Photography Academy Prime,$47/month,https://www.skool.com/photographyacademyprime/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,859 Members • $47/month
AI Video Bootcamp,$9/month,https://www.skool.com/aivideobootcamp/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16.9k Members • $9/month
Abbew Crew,$260,https://www.skool.com/abbewcrew/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,28.1k Members • $260
Your First $5k Club w/ARLAN,Free,https://www.skool.com/yourfirst5k/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,24.8k Members • Free
Kickstarter Challenge,Free,https://www.skool.com/lwp-kickstarter/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26.3k Members • Free
𝙂𝙊𝙊𝙎𝙄𝙁𝙔 🍓🐛🦋🌈⭐️🩷,Free,https://www.skool.com/goosify/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12.1k Members • Free
Mikey's Money House,$8/month,https://www.skool.com/mikeysmoneyhouse/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.9k Members • $8/month
Apna Kamao,Free,https://www.skool.com/apna-kamao-9655/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.5k Members • Free
STNDRD Coaching,Free,https://www.skool.com/stndrd-coaching/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,80 Members • Free
🐉 Order of Explorers,$19/month,https://www.skool.com/oxe/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,39 Members • $19/month
4biddenknowledge Academy,$55/month,https://www.skool.com/4biddenknowledge/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.8k Members • $55/month
Brotherhood Of Scent,Free,https://www.skool.com/bos/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8.7k Members • Free
Business & Grant Community,$47/month,https://www.skool.com/business-and-grant-mentorship-9581/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7k Members • $47/month
Free Skool Course,Free,https://www.skool.com/free-course/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,63.6k Members • Free
GET FIT TOGETHER,$1/month,https://www.skool.com/getfit-together/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12.9k Members • $1/month
Studio Era Society,Free,https://www.skool.com/studio-era/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11.1k Members • Free
Story Hacker AI,Free,https://www.skool.com/story-hacker/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • Free
Feel Look Be Lifestyle Ready,Free,https://www.skool.com/feellookbeready/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,774 Members • Free
AI Automation Agency Hub,Free,https://www.skool.com/learn-ai/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,306.8k Members • Free
Chosen Learning Center (CLC),$25/month,https://www.skool.com/chosenlearningcenter/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • $25/month
Imperium Academy™,Free,https://www.skool.com/academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,58.9k Members • Free
Make $1k-$10k in 30 days,Free,https://www.skool.com/make-1k-5k-in-30-days-8449/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17.8k Members • Free
The Soccer Pathway Pro,$77/month,https://www.skool.com/proplayerpathway/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,250 Members • $77/month
Core Club,Free,https://www.skool.com/coreclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.5k Members • Free
The AI Advantage,Free,https://www.skool.com/the-ai-advantage/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,81k Members • Free
Misión: invertir en bolsa,$28/month,https://www.skool.com/invertirenbolsa/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • $28/month
Player Accelerator,$999/month,https://www.skool.com/zth-champions-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.2k Members • $999/month
28Pilates,Free,https://www.skool.com/28pilates/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10.3k Members • Free
AI Money Lab,Free,https://www.skool.com/ai-seo-with-julian-goldie-1553/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,66.5k Members • Free
Generational Revival,Free,https://www.skool.com/generational-revival/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26.8k Members • Free
AI Automation (A-Z),Free,https://www.skool.com/freegroup/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,150.9k Members • Free
ANIME SHREDS - THE DOJO,$11/month,https://www.skool.com/animeshreds/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2k Members • $11/month
BYOB: Bring Your Own Business™,Free,https://www.skool.com/byob/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,711 Members • Free
Circular Machine Knitting Addi,Free,https://www.skool.com/circular-machine-knitting/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.7k Members • Free
Club Raw,$39/month,https://www.skool.com/clubraw/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,695 Members • $39/month
Di-Maccio Art Academy,Free,https://www.skool.com/di-maccio-art-academy-free/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.8k Members • Free
The Cyber Range,$129/month,https://www.skool.com/cyber-range/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.7k Members • $129/month
Franzese Family,$10/month,https://www.skool.com/franzese-family/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,848 Members • $10/month
Alex Curso Gratuito!,Free,https://www.skool.com/alexcursogratis/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.7k Members • Free
Let's Master English,Free,https://www.skool.com/lme/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.1k Members • Free
Total Goalkeeping,Free,https://www.skool.com/goalkeeper/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7.4k Members • Free
Zero to Hero with AI,Free,https://www.skool.com/zero-to-hero-with-ai-5804/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10.7k Members • Free
AI Automations by Jack,$77/month,https://www.skool.com/aiautomationsbyjack/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.7k Members • $77/month
Magical Transformations,$25/month,https://www.skool.com/magical-transformations/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,717 Members • $25/month
Maker School,$184/month,https://www.skool.com/makerschool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.2k Members • $184/month
Natural Living Makeover,Free,https://www.skool.com/natural-living-makeover-now/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.7k Members • Free
%1 YouTube Kulübü,$27/month,https://www.skool.com/erkan-ve-dostlar-1648/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,971 Members • $27/month
The Holistic Reset Club™,$997/year,https://www.skool.com/the-holistic-reset-club-6819/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,74 Members • $997/year
⚔️ Warrior-Makers Community!,Free,https://www.skool.com/warrior-makers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.3k Members • Free
Ninjas AI Automation,$9/month,https://www.skool.com/ninjas/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.5k Members • $9/month
Digital Gold Rush,$11/month,https://www.skool.com/digitalgoldrush/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,147 Members • $11/month
KubeCraft Career Accelerator,"$4,800/year",https://www.skool.com/kubecraft/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"867 Members • $4,800/year"
Library of Adonis,$37/month,https://www.skool.com/library-of-adonis/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.4k Members • $37/month
Strong Confident Living,Free,https://www.skool.com/strongconfidentliving/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.4k Members • Free
Watch Lover | Community,Free,https://www.skool.com/watch-lover/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.7k Members • Free
SWC 2.0 The Level Up,Free,https://www.skool.com/swcthelevelup/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,28.8k Members • Free
BBQ Nation,$1/month,https://www.skool.com/bbqfr/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.6k Members • $1/month
Bulletproof Cycling Club,$595/year,https://www.skool.com/bulletproof/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,914 Members • $595/year
Golden Capital Investments,$110/month,https://www.skool.com/golden-capital-investments/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,612 Members • $110/month
Snipe University,$97/month,https://www.skool.com/sniper-society/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,550 Members • $97/month
Pablo Martínez García,Free,https://www.skool.com/pablo-martinez-garcia/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,18k Members • Free
男兒幫-N.M.O,$49/month,https://www.skool.com/nmo/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,590 Members • $49/month
YouTube Basics,$297,https://www.skool.com/youtubebasics/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,159 Members • $297
Ventures Fly Co.,Free,https://www.skool.com/ventures-fly-co/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.6k Members • Free
AI Profit Boardroom,$59/month,https://www.skool.com/ai-profit-lab-7462/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.7k Members • $59/month
Standin' on Business,Free,https://www.skool.com/standinonbusiness/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13.5k Members • Free
Exploring Peptides Community,Free,https://www.skool.com/exploring-peptides-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12.4k Members • Free
The FitMama Club,"$4,500",https://www.skool.com/fitmama-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"127 Members • $4,500"
The Grim Circle,$39/month,https://www.skool.com/grim/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • $39/month
Story Hacker Silver,$7,https://www.skool.com/story-hacker-silver/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7.5k Members • $7
Skool Scale Camp,Free,https://www.skool.com/skool-scale-camp/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.8k Members • Free
Skate Life,Free,https://www.skool.com/skate/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,14.2k Members • Free
MB’s Millionaire Closer School,$49/month,https://www.skool.com/mbs-millionaire-closers-9776/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,574 Members • $49/month
AI Automation Vault,Free,https://www.skool.com/ai-automation-vault/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.3k Members • Free
The Seated Wealth Challenge,Free,https://www.skool.com/the-seated-wealth-challenge-1602/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7.1k Members • Free
Mobility & Injury Prevention,Free,https://www.skool.com/movesmethod/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,193.5k Members • Free
AI Cyber Value Creators,Free,https://www.skool.com/ai-cyber-value-creators/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8.6k Members • Free
Superior Students,Free,https://www.skool.com/study/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20.4k Members • Free
Road 2 Riches,$197/month,https://www.skool.com/road2riches/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,56 Members • $197/month
Gamify SAT,Free,https://www.skool.com/gamifysat/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17.5k Members • Free
Pinterest Skool,Free,https://www.skool.com/pinterest/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.4k Members • Free
Ai Creators Academy,Free,https://www.skool.com/ai-creators-academy-8093/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.9k Members • Free
Camp Nursing School,$9/month,https://www.skool.com/campnursingschool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.5k Members • $9/month
Crust & Crumb Academy,Free,https://www.skool.com/crust-crumb-academy-7621/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,611 Members • Free
Real Men Real Style Community,Free,https://www.skool.com/rmrs/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13.5k Members • Free
ITLC,Free,https://www.skool.com/itlc/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.8k Members • Free
Tribu Vida Consciente,Free,https://www.skool.com/tribu/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,421 Members • Free
Grow With Evelyn,$33/month,https://www.skool.com/evelyn/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.6k Members • $33/month
⭐️The Skool Hub⭐️,Free,https://www.skool.com/theskoolhub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.2k Members • Free
Her Influence Academy,$297/month,https://www.skool.com/herinfluenceacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,423 Members • $297/month
BELIEVE ACADEMY🏆,$59/month,https://www.skool.com/tiktokshopacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • $59/month
The Credit Hub,Free,https://www.skool.com/tch/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,728 Members • Free
Unlimited Wisdom,Free,https://www.skool.com/unlimitedwisdom/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • Free
the skool CLASSIFIEDS,Free,https://www.skool.com/classifieds/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • Free
Mandarin Blueprint Lite,Free,https://www.skool.com/mandarin-blueprint-free/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,31.4k Members • Free
Oscar's Community,$39/month,https://www.skool.com/oscars-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6.9k Members • $39/month
Origins,$98/month,https://www.skool.com/origins/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • $98/month
Tradelab🧠,$111/month,https://www.skool.com/tradelab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,762 Members • $111/month
ABV Society,$10/month,https://www.skool.com/abv-society/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,105 Members • $10/month
Manifestation Mastery Skool,$9/month,https://www.skool.com/manifestation/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,375 Members • $9/month
Savage Sisters,$29/month,https://www.skool.com/savagesisters/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,125 Members • $29/month
Zenith Forex,$10,https://www.skool.com/zenith-forex/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.1k Members • $10
Inversiones para Latinos,$49/month,https://www.skool.com/inversionesparalatinos/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.5k Members • $49/month
Altcoin Pro University,$97/month,https://www.skool.com/altcoin-pro/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,654 Members • $97/month
Tongue of Fire Ministry,$1/month,https://www.skool.com/tongue-of-fire/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.6k Members • $1/month
High Vibe Tribe,Free,https://www.skool.com/highvibetribe/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,80.3k Members • Free
Yo Te Ayudo - NIVEL 1,"$10,000/month",https://www.skool.com/comunidad-yo-te-ayudo-2120/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"473 Members • $10,000/month"
AI Content Creation Community,Free,https://www.skool.com/aicontentcommunity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.2k Members • Free
Wholesale Vacant Land,Free,https://www.skool.com/wienerbros/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,15.2k Members • Free
ETERNAL LIFE TRIBE,$55/month,https://www.skool.com/eternallifetribe/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.7k Members • $55/month
Ashish Builds Academy – Lite,Free,https://www.skool.com/ashish-builds-academy-lite-5442/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23.1k Members • Free
Poop Scoop Millionaire™,$69/month,https://www.skool.com/poop-scoop-millionaire/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,719 Members • $69/month
CEO Lab (Marketer Skool),$97/month,https://www.skool.com/marketers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • $97/month
AI Video Creators Community,$9/month,https://www.skool.com/ai-video-creators/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5k Members • $9/month
Photo & Video Freelancers 🚀,Free,https://www.skool.com/photography-skool-8350/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,610 Members • Free
Natural Living Club,$3/month,https://www.skool.com/natural-living/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.7k Members • $3/month
Trading Bootcamp,$200/month,https://www.skool.com/trading-bootcamp-2253/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.8k Members • $200/month
GrantHouse,Free,https://www.skool.com/granthouse/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.2k Members • Free
Leadership Skool,Free,https://www.skool.com/advertise-your-skool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.3k Members • Free
✨AWAKEN✨,$11/month,https://www.skool.com/awakencommunity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.9k Members • $11/month
April Laugh Active,$99/month,https://www.skool.com/april-laugh-active/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,217 Members • $99/month
Rebel ASMR,$11/month,https://www.skool.com/rebelasmr/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,141 Members • $11/month
The 1550+ Formula,$99/month,https://www.skool.com/satprep/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,389 Members • $99/month
Wonderful World English,Free,https://www.skool.com/wonderful-world-english/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7.4k Members • Free
English Paper Piecing Society,Free,https://www.skool.com/epp/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,255 Members • Free
AI Content Creators,Free,https://www.skool.com/ai-content-creators-7093/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.1k Members • Free
3.6.9 Community,$39/month,https://www.skool.com/369community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,708 Members • $39/month
Photon Academy,$14/month,https://www.skool.com/photonacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,349 Members • $14/month
Official Infinity Hoop,Free,https://www.skool.com/infinity-hoop/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8.1k Members • Free
The Pro Player Pathway,$197,https://www.skool.com/theproplayerpathway/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,313 Members • $197
New Society,$37/month,https://www.skool.com/new-society/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,365 Members • $37/month
CLUB GELARTE,$12/month,https://www.skool.com/clubgelarte/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,141 Members • $12/month
Vibe Coding Academy,$97/month,https://www.skool.com/vibe-coding-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.4k Members • $97/month
The Stronger Human,Free,https://www.skool.com/thestrongerhuman/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26.9k Members • Free
CC.us Ivy-Bound Challenge,Free,https://www.skool.com/ccus-ivy-bound-challenge-9654/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,77 Members • Free
Tantra Nectar,Free,https://www.skool.com/tantra-nectar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23.3k Members • Free
Crypto Collective,$17/month,https://www.skool.com/crypto-collective/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,781 Members • $17/month
Big boys R us,Free,https://www.skool.com/big-boys-r-us-4892/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,878 Members • Free
Project Biohacked,Free,https://www.skool.com/projectbiohacked/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11.2k Members • Free
Raw Food Romance,$47/month,https://www.skool.com/raw-food-romance-3420/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,321 Members • $47/month
The Movement,$35/month,https://www.skool.com/move/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,865 Members • $35/month
LIBERAL CLARITY GROUP,$27/year,https://www.skool.com/liberal-clarity-group/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.1k Members • $27/year
Inner Journey School🧘🏼‍♂️,$15/month,https://www.skool.com/inner-journey-school/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,842 Members • $15/month
MADE FROM ZERO,Free,https://www.skool.com/made-from-zero-7962/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2k Members • Free
Sales & Leadership Academy,$97/month,https://www.skool.com/elitesalesuniversity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,533 Members • $97/month
Magnetic Memberships,Free,https://www.skool.com/magneticmemberships/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.8k Members • Free
The Content Club,Free,https://www.skool.com/lanakearneysocial/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.5k Members • Free
Wholesailors Academy,$25/month,https://www.skool.com/wholesailors/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.5k Members • $25/month
Breakthrough Body Blueprint,Free,https://www.skool.com/darrenliufitness/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,562 Members • Free
Carolina Academy,$40/month,https://www.skool.com/aprendeconcarolina/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,334 Members • $40/month
The NO BS Society! (FREE),Free,https://www.skool.com/nobs/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,523 Members • Free
Reinillonarias Membership,$35/month,https://www.skool.com/reinillonariasmembership/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,420 Members • $35/month
The Flock,$15/month,https://www.skool.com/theflock/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,161 Members • $15/month
NeuroSpicy Community,$29/month,https://www.skool.com/neurospicy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.5k Members • $29/month
Wheels 2 Wealth,Free,https://www.skool.com/wheels-2-wealth-8250/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,929 Members • Free
AI Automation Society Plus,$99/month,https://www.skool.com/ai-automation-society-plus/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.3k Members • $99/month
Group Home Cash Flow Club,$67/month,https://www.skool.com/group-home-cash-flow-club-1950/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,490 Members • $67/month
Become Unforgettable,Free,https://www.skool.com/become-unforgettable/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.7k Members • Free
ADHD Harmony™,Free,https://www.skool.com/adhd/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.9k Members • Free
High Achiever Society,Free,https://www.skool.com/highachieversociety/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.8k Members • Free
Recess,Free,https://www.skool.com/recess/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,603 Members • Free
Wealth Mastery Academy,Free,https://www.skool.com/wealth-mastery-academy-/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.3k Members • Free
Cyber Careers Community,$99/year,https://www.skool.com/cyber-careers-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.5k Members • $99/year
Rebel AI Academy,$11/month,https://www.skool.com/rebelaiacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,171 Members • $11/month
ABC Academy,Free,https://www.skool.com/abc-academy-3941/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,822 Members • Free
Digital Wealth Academy 3.0,Free,https://www.skool.com/the-digital-wealth-academy-1240/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,135.6k Members • Free
Shonen Strength,$79,https://www.skool.com/shonen-strength/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.1k Members • $79
MONETIZA ACADEMY,$50/month,https://www.skool.com/monetizaacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.1k Members • $50/month
Upgrade Project,$34/month,https://www.skool.com/upgrade-project-6844/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,69 Members • $34/month
Tsk Diet ( Premium Community ),$37/month,https://www.skool.com/tsk-diet-premium-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,184 Members • $37/month
GenHQ - Creative AI Education,$97/month,https://www.skool.com/genhq/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.5k Members • $97/month
Selling Online / Prime Mover,Free,https://www.skool.com/prime-mover/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,36.6k Members • Free
Evergreen Foundations,Free,https://www.skool.com/foundations/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,660 Members • Free
We Teach League,Free,https://www.skool.com/we-teach-league/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11.4k Members • Free
AI Operators Club,Free,https://www.skool.com/ai-operators-club-2465/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6k Members • Free
Nông Dân Content,$200/year,https://www.skool.com/nong-dan-content/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,104 Members • $200/year
EF Trading Premium,$99/month,https://www.skool.com/ef-trading/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,408 Members • $99/month
Kingdom Brotherhood,Free,https://www.skool.com/kingdombrotherhood/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.3k Members • Free
Sociedad ELITE,$97/month,https://www.skool.com/sociedad-elite-7312/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,176 Members • $97/month
Synthesizer Scaling,"$1,700/month",https://www.skool.com/scaler/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"295 Members • $1,700/month"
Neurohacking Community,Free,https://www.skool.com/neurohacking/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,875 Members • Free
Peakvest Society,$1/year,https://www.skool.com/peakvest/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12.7k Members • $1/year
VoiceOver School,$47/month,https://www.skool.com/voiceoverschool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,376 Members • $47/month
Sketching Familie,$65/month,https://www.skool.com/sketching-familie/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,256 Members • $65/month
Chase AI Community,Free,https://www.skool.com/chase-ai-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,52.5k Members • Free
Miss Megan Makeup Revival,$19/month,https://www.skool.com/missmegan/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,172 Members • $19/month
MIRROR,Free,https://www.skool.com/mirror/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,375 Members • Free
MPM Job Hunt - ELITE,$361/month,https://www.skool.com/mpm-unlimited-3396/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,350 Members • $361/month
Houseplant Enthusiasts,Free,https://www.skool.com/plant-enthusiast-6960/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,15.1k Members • Free
Mike Barron's Closer Academy,Free,https://www.skool.com/mike-barron-closer-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,855 Members • Free
Top Chess Community,Free,https://www.skool.com/top-chess-gang-7947/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,19.6k Members • Free
NeuroImprint™,Free,https://www.skool.com/manifestation-activation/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9.5k Members • Free
Profitfy,$97/month,https://www.skool.com/profitfy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • $97/month
Tilbake Til Livet,Free,https://www.skool.com/ttl/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,264 Members • Free
PDF Virales,$29/month,https://www.skool.com/pdf/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,695 Members • $29/month
TPE Photography Tribe,$25/month,https://www.skool.com/thephotographiceye/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,263 Members • $25/month
Tattoo Masterclass,$39/month,https://www.skool.com/tattoo-incubator/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • $39/month
The Freedom Accelerator,Free,https://www.skool.com/master-investor-accelerator-7177/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • Free
Sawdust Startups,$59/month,https://www.skool.com/sawduststartups/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,530 Members • $59/month
Wholesaling Real Estate,Free,https://www.skool.com/wholesaling/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,69.6k Members • Free
The Trading Academy,Free,https://www.skool.com/the-trading-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.3k Members • Free
Tim Han — Heartfluencer Family,Free,https://www.skool.com/successinsider/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.9k Members • Free
The Iconic Digital Ceo,Free,https://www.skool.com/the-iconic-digital-ceo-3898/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,515 Members • Free
THP Jump Training,Free,https://www.skool.com/thp/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,79.5k Members • Free
MG Academy,$27/month,https://www.skool.com/mgabondance/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • $27/month
V1B1N Tribe 🌸🧜‍♀️🍉🦋🔆🕺💕,Free,https://www.skool.com/v1b1n/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,575 Members • Free
Dadland,$299/month,https://www.skool.com/dadland/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,93 Members • $299/month
Activity 🩵 byGeraldGerlich,Free,https://www.skool.com/activity-leaders-flame-6708/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,55 Members • Free
Dijital Girişimcilik Okulu,$999/month,https://www.skool.com/dijital-girisimcilik-okulu/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,575 Members • $999/month
The 1% in AI,$49/month,https://www.skool.com/top1percent/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,892 Members • $49/month
SAT Prep,Free,https://www.skool.com/sat/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16.5k Members • Free
La TEAM FlashFitHome,$99/month,https://www.skool.com/lateamflashfithome/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,345 Members • $99/month
Midas Touch ⚡️ Trading,$47/month,https://www.skool.com/the-midas-touch-trading-group-2105/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,943 Members • $47/month
The Divine Ones Walking Club,$37/month,https://www.skool.com/the-divine-ones-walking-club-3318/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,151 Members • $37/month
9D Breathwork Community,Free,https://www.skool.com/breathworkrevolution/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,15.8k Members • Free
Fábrica de Líderes Digitales,$97/month,https://www.skool.com/fabrica-de-lideres-digitales-4474/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,78 Members • $97/month
Harmony,$15/month,https://www.skool.com/harmony/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,24k Members • $15/month
The Way Of The Surfer,$10/month,https://www.skool.com/thewayofthesurfer/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,33 Members • $10/month
TheBlackFacelessAISociety,Free,https://www.skool.com/theblackfacelessaisociety/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,811 Members • Free
FWTLO,Free,https://www.skool.com/fwtlo/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,476 Members • Free
CS2 Improvement Camp,$29/month,https://www.skool.com/cs2improvement/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,659 Members • $29/month
Voice AI Accelerator,Free,https://www.skool.com/voice-ai/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7.7k Members • Free
FÓRMULA 100k 🚀,$47/month,https://www.skool.com/formula-100k/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • $47/month
No Anxiety Nation,$49/month,https://www.skool.com/no-anxiety-nation/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,290 Members • $49/month
Marriage Reset Support,Free,https://www.skool.com/marriage-reset-support-5825/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,668 Members • Free
PI's Hustle Hive,Free,https://www.skool.com/thehustlehive-pi/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16.9k Members • Free
Budgetdog Academy,Free,https://www.skool.com/budgetdog-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.3k Members • Free
PM Mastermind,$27/month,https://www.skool.com/pmp-mastermind-3105/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.8k Members • $27/month
Project Bellplex,$45/month,https://www.skool.com/projectbellplex/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • $45/month
Social Freedom Club ⚡,Free,https://www.skool.com/confidence/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.6k Members • Free
BLA MATBAN Academy®,$39/month,https://www.skool.com/yacoubiiiy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,405 Members • $39/month
Very Social Animal,Free,https://www.skool.com/verysocialanimal/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.6k Members • Free
STS Community: Mom's House,Free,https://www.skool.com/moms-house-sts-certification-8977/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.1k Members • Free
Embroidery Legacy Software Hub,Free,https://www.skool.com/embroidery-legacy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2k Members • Free
What Shopping Problem? 👀,Free,https://www.skool.com/what-shopping-problem-5452/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
Oracle Connections,Free,https://www.skool.com/oracle/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.8k Members • Free
We Meet Wednesdays ☕️🔥💪❤️,Free,https://www.skool.com/wemeetwednesdays/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,896 Members • Free
WeScale Accelerator,$180/month,https://www.skool.com/wescale/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,827 Members • $180/month
Embrace the Space,Free,https://www.skool.com/embrace-the-space-7828/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.8k Members • Free
Reality Revolution,$67/month,https://www.skool.com/realityrevolution/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,634 Members • $67/month
She Sells ®,Free,https://www.skool.com/she-sells-with-brooke/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.2k Members • Free
Golden Healing Verein,$29/month,https://www.skool.com/golden-healing-verein-9058/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,167 Members • $29/month
Team3DAlpha,$10/month,https://www.skool.com/team3dalpha/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.4k Members • $10/month
Online Ticaret Üniversitesi,Free,https://www.skool.com/online-ticaret-universitesi-2309/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10.5k Members • Free
Path to Profits Elite,Free,https://www.skool.com/path-to-profits-elite-5976/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9k Members • Free
Mission Mode with Madalyn,$19/month,https://www.skool.com/mission-mode-2297/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,56 Members • $19/month
VSA Avengers,Free,https://www.skool.com/vsa-avengers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,139 Members • Free
Medical Courier Community,Free,https://www.skool.com/medical-courier-group-5674/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26.3k Members • Free
Level-Up - GCSE & A-Level Pro,$59/month,https://www.skool.com/gcse-mental-health-support/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,630 Members • $59/month
GovconOS,Free,https://www.skool.com/govcon/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11.6k Members • Free
The Survival Gardener,$24/month,https://www.skool.com/the-survival-gardener/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,158 Members • $24/month
Magnetic Circle,$97/month,https://www.skool.com/magneticcircle/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,850 Members • $97/month
Jobsties Academy,$99/month,https://www.skool.com/jobsties-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,203 Members • $99/month
Elite Achievers,Free,https://www.skool.com/eliteachievers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,249 Members • Free
High Performance Notary,Free,https://www.skool.com/notary/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.2k Members • Free
WFH Job Bank,Free,https://www.skool.com/wfh-job-bank-5218/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,216 Members • Free
Recalibr8te Coaching,Free,https://www.skool.com/recalibr8te-5760/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,375 Members • Free
Life Youniversity,$49/month,https://www.skool.com/lifeyouniversity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,40 Members • $49/month
Magical Transformations (Free),Free,https://www.skool.com/disney-adult-fitness/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13.8k Members • Free
Fitrox Academy,$10/month,https://www.skool.com/fitrox/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,537 Members • $10/month
🪷 Be Your Own Medium,$7/month,https://www.skool.com/medium/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,380 Members • $7/month
Like-Minded Klub,Free,https://www.skool.com/life/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7.6k Members • Free
The Directory On Skool,Free,https://www.skool.com/thedirectory/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,394 Members • Free
Studicata,Free,https://www.skool.com/studicata/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16.6k Members • Free
Mimis Kreativwelt,$39/month,https://www.skool.com/mimis-kreativwelt-9095/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,159 Members • $39/month
Stamps on Stacks LLC,Free,https://www.skool.com/stamps-on-stacks/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,477 Members • Free
WAH Vault w/WAHJobQueen™,$9/month,https://www.skool.com/wahjobqueen/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.2k Members • $9/month
Trendly,Free,https://www.skool.com/trendly-6259/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,664 Members • Free
FMT Academy,$35/month,https://www.skool.com/protect/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,255 Members • $35/month
Law of Attraction VIP Academy,$31/month,https://www.skool.com/lawofattraction/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,140 Members • $31/month
MY MAMAS WIN!,$5/month,https://www.skool.com/mymamaswin/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,334 Members • $5/month
TCR CLUB,$49/month,https://www.skool.com/tcr-club-9883/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,195 Members • $49/month
The Bible Journaling Club,Free,https://www.skool.com/the-bible-journaling-club-9543/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,161 Members • Free
Klub 180,$49/month,https://www.skool.com/klub-180/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,149 Members • $49/month
"Granny Wisdom, Hippie Vibes",Free,https://www.skool.com/ahappyhippie/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,267 Members • Free
Sezer Yılmaz Academy,$10/month,https://www.skool.com/sezeryilmazacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,338 Members • $10/month
Swimpros 🏊,Free,https://www.skool.com/mindgympro/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • Free
The Black Sheep Community,$97/month,https://www.skool.com/blacksheep-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,585 Members • $97/month
Le Parvis du Temple,Free,https://www.skool.com/lefrancmacon/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.9k Members • Free
Tom Camp Trading Academy,$49/month,https://www.skool.com/tom-camp-trading-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,757 Members • $49/month
The 7-Figure Accelerator,Free,https://www.skool.com/7-figure-accelerator-by-philip-9912/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7.7k Members • Free
Ellorias Familienwerkstatt,Free,https://www.skool.com/ellorias-familienwerkstatt-8253/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,108 Members • Free
Clief Notes,Free,https://www.skool.com/quantum-quill-lyceum-1116/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12.7k Members • Free
AI Realism Starter Hub,Free,https://www.skool.com/ineffableai/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16.5k Members • Free
MASTER EDUCADORAS ONLINE,$29/month,https://www.skool.com/master-educadora-online-6439/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,332 Members • $29/month
GTA | Gold Trading Academy,$99/month,https://www.skool.com/gta-gold-trading-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,334 Members • $99/month
HAMZA BHM POD KING CLUB 👑,$49/year,https://www.skool.com/hamzabhm/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3k Members • $49/year
Simpli Faceless,$27/month,https://www.skool.com/simpli-faceless/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • $27/month
Upcycled Sewing Rebels,Free,https://www.skool.com/refashionrebels/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.3k Members • Free
Creator Profits,Free,https://www.skool.com/creatorprofits/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,18.2k Members • Free
LOUPIOS VIP-MANIFESTATION GANG,$55/month,https://www.skool.com/loupios-vip-manifestation-gang-8566/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,153 Members • $55/month
Corbellic Art Studio - Elite,$47/month,https://www.skool.com/corbellicstudio/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,328 Members • $47/month
Ecom Edge Accelerator,Free,https://www.skool.com/ecom-edge-1394/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.3k Members • Free
52 Week Guitar Player 3.0,"$2,400/year",https://www.skool.com/52weekguitarplayer/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"416 Members • $2,400/year"
Online Business Friends,Free,https://www.skool.com/obf/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,89.9k Members • Free
Mentors and Masterminds,Free,https://www.skool.com/mentors-and-masterminds/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,38 Members • Free
Rascals Education Academy,$127/month,https://www.skool.com/rascals-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,428 Members • $127/month
The SKOOL Directory,Free,https://www.skool.com/skool-community-9362/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,635 Members • Free
Build A Bank Academy,Free,https://www.skool.com/build-a-bank-academy-9232/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,145 Members • Free
Curso Payasos-hospital,$5/month,https://www.skool.com/payasos-de-hospital-5536/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,101 Members • $5/month
NextGen AI,Free,https://www.skool.com/nextgenai/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20.1k Members • Free
Tech Confident Community,Free,https://www.skool.com/tech-confident-community-9075/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,382 Members • Free
Liberty Politics Discussion,Free,https://www.skool.com/libertypolitics/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.1k Members • Free
CoderCo DevOps Academy,$199/month,https://www.skool.com/coderco/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,904 Members • $199/month
Le QG de l'IA,$49/month,https://www.skool.com/qg-ia/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,969 Members • $49/month
RC3 Leadership Lab,Free,https://www.skool.com/leadership-influence-lab-2752/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,147 Members • Free
Money Switch by ECOM REAL,$49,https://www.skool.com/ecomreal/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6.6k Members • $49
CyberCircle,Free,https://www.skool.com/cyber/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,85.2k Members • Free
THE BLESSING,$5/month,https://www.skool.com/blessing/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,98 Members • $5/month
LaFONT | Community,"$10,000/month",https://www.skool.com/lafont/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"193 Members • $10,000/month"
Russian Chess School,$29/month,https://www.skool.com/russianchessschool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,430 Members • $29/month
Die KI Community,$97/month,https://www.skool.com/kicommunity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,161 Members • $97/month
Re-prográmate con Ana Lloveras,Free,https://www.skool.com/reprogramate-con-ana-lloveras/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,239 Members • Free
Anti-Procrastinación︱Gratis,Free,https://www.skool.com/anti-procrastinacion/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.7k Members • Free
Agency Owners,Free,https://www.skool.com/agencyowners/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,19.4k Members • Free
Win The First 30 Days,Free,https://www.skool.com/wtf/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • Free
Ilana's Method,"$4,999/year",https://www.skool.com/method/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"856 Members • $4,999/year"
Mogwarts™,$19/month,https://www.skool.com/mogwarts/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.4k Members • $19/month
AI Launchpad for Skool,Free,https://www.skool.com/ailaunchpad/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,526 Members • Free
WinCampaign THRIVE,Free,https://www.skool.com/wincampaignthrive/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.4k Members • Free
𝐑𝐑𝟕 𝐒𝐊𝐎𝐎𝐋,$30/month,https://www.skool.com/rr7-club-777/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,278 Members • $30/month
THEHORMONEPROPHET,$44/month,https://www.skool.com/theorder/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,100 Members • $44/month
Fund To Freedom,"$2,499/year",https://www.skool.com/fund/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"249 Members • $2,499/year"
Key Learners Piano Club,Free,https://www.skool.com/keylearners/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • Free
LMG's AI Academy,Free,https://www.skool.com/lmgs-ai-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.9k Members • Free
Hackathon,Free,https://www.skool.com/hackathon/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.5k Members • Free
Comunidad Japón,"$10,000/year",https://www.skool.com/japones/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"285 Members • $10,000/year"
Entorno Digital Estratégico,Free,https://www.skool.com/entorno-digital-estrategico/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,193 Members • Free
Feminine Energy Academy🌹💍💰,$37/month,https://www.skool.com/feminineenergyacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,369 Members • $37/month
Blackthorne Capital,$49/month,https://www.skool.com/blackthornecapital/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,46 Members • $49/month
WFH Job Hunt,$35,https://www.skool.com/wfh-job-hunt-9812/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,815 Members • $35
📖 AI STORYTELLERS 🎬,Free,https://www.skool.com/aistorytellers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,396 Members • Free
Ellis Academy,$189/year,https://www.skool.com/ellisacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,199 Members • $189/year
Velocity Prep,$120/month,https://www.skool.com/velocityprep/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,333 Members • $120/month
Hacksmith’s Peptalk Community,$10/month,https://www.skool.com/hacksmithspeptalk/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.2k Members • $10/month
Basterd Crew,$9/month,https://www.skool.com/basterd/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,66 Members • $9/month
ASMRSpreads Lab,Free,https://www.skool.com/asmrspreads-lab-2639/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,968 Members • Free
PropTradingSpecialist.com,Free,https://www.skool.com/pts-group-4217/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,37 Members • Free
Pronounce Korean 🇰🇷,$30/month,https://www.skool.com/pronounce-korean/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,101 Members • $30/month
O Viață Abundentă și Împlinită,$29/month,https://www.skool.com/o-viata-abundenta-si-implinita-3503/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,50 Members • $29/month
Clandestino,$54/month,https://www.skool.com/clandestino-9557/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,82 Members • $54/month
The RoboNuggets Community,$97/month,https://www.skool.com/robonuggets/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • $97/month
The One Percent,Free,https://www.skool.com/the-one-percent/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.7k Members • Free
Magnetic Love Collective,$19/month,https://www.skool.com/manifestwithmatt/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,88 Members • $19/month
The Pinky Effect,$200/month,https://www.skool.com/thepinkyeffect/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,76 Members • $200/month
VSA Legends,$97/month,https://www.skool.com/vsa-legends/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,105 Members • $97/month
Matt Ryder F The GuRUs,$69/month,https://www.skool.com/mattryder/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • $69/month
BraudAcademy - IA Creativa,$39/month,https://www.skool.com/braudacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,530 Members • $39/month
Vision Body Fitness,Free,https://www.skool.com/visionbodyfitness/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • Free
KI Buch Club 🔥 ⭐⭐⭐⭐⭐,Free,https://www.skool.com/ki-buch-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,662 Members • Free
Az Egészség Szigete,$29/month,https://www.skool.com/azegeszsegszigete/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,325 Members • $29/month
Total Reset Coaching,Free,https://www.skool.com/total-reset-coaching/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,60 Members • Free
Evolution Creator Membership,Free,https://www.skool.com/tiktok-1203/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.3k Members • Free
AI Creator Bootcamp,$9/month,https://www.skool.com/aicreatorbootcamp/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.7k Members • $9/month
Elite Sales Alliance,Free,https://www.skool.com/elitesalesalliance/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,22k Members • Free
Marriage Reset Group,Free,https://www.skool.com/marriage-reset-9827/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.7k Members • Free
Talas Akademija,$70/month,https://www.skool.com/talasakademija/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • $70/month
Spanish After Hours,Free,https://www.skool.com/friends/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.5k Members • Free
Masterclass Academy,$9/month,https://www.skool.com/masterclass-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,746 Members • $9/month
AI Business Trailblazers Hive,Free,https://www.skool.com/ai-biz-trailblazers-hive/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13.3k Members • Free
AI for LinkedIn - evyAI.com,Free,https://www.skool.com/evyai/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.7k Members • Free
VSA Guardians,Free,https://www.skool.com/vsa-guardians/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,110 Members • Free
Kahi Life Coach Community,Free,https://www.skool.com/kahi-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,534 Members • Free
Dispatcher University,$97/month,https://www.skool.com/dispatch/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,314 Members • $97/month
Universidad del Trader,$900,https://www.skool.com/universidaddeltrader/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,47 Members • $900
Med & Mr. X Mentorship,$27/month,https://www.skool.com/itsmedait/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,70 Members • $27/month
The Entrepreneur Hub🐐,$150/month,https://www.skool.com/executor-university-7584/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,217 Members • $150/month
Davie's Free Ecom Course,Free,https://www.skool.com/davies-free-ecom-course/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,72.3k Members • Free
Kourse,"$1,500/month",https://www.skool.com/kourse/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"654 Members • $1,500/month"
The Fruit Up Til 5 Community,$20/month,https://www.skool.com/masteryourday/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,30 Members • $20/month
¡Manifiesta tu Abundancia! ✨,$14,https://www.skool.com/manifiestatuabundancia/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.9k Members • $14
Learn Wiserr,$5/month,https://www.skool.com/learnwiserr/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,111 Members • $5/month
Faceless Girl Era,Free,https://www.skool.com/faceless-girl-era-9647/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.8k Members • Free
Holistic Product Tester Group,Free,https://www.skool.com/holistic/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,30.4k Members • Free
Prosperity School,"$1,497",https://www.skool.com/prosperity-school/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"757 Members • $1,497"
牛軍開門｜股市牛轉門｜基礎,Free,https://www.skool.com/niujun-open-the-door/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,299 Members • Free
ULTIMATE WEALTH ACADEMY,Free,https://www.skool.com/ultimatewealthacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7.7k Members • Free
RE-ACTIVA 40+,"$10,000/year",https://www.skool.com/reactiva40/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"161 Members • $10,000/year"
The Angel Raphael Community,Free,https://www.skool.com/the-angel-raphael-community-3421/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.6k Members • Free
Piano with Rebecca B,$12/month,https://www.skool.com/pianowithrebeccab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,340 Members • $12/month
Aquarell Club,$14/month,https://www.skool.com/aquarell-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,143 Members • $14/month
The Archive,$3/month,https://www.skool.com/thearchive/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.1k Members • $3/month
Money Moms,$99/month,https://www.skool.com/moneymoms/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,134 Members • $99/month
SHREDDERS UNIVERSITY 2.0,$127/month,https://www.skool.com/shreddersuni2/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,134 Members • $127/month
Pigmenter Club,Free,https://www.skool.com/pigmenter-club-33/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,80 Members • Free
Early AI-dopters,$64/month,https://www.skool.com/earlyaidopters/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • $64/month
AI Automations by Kia,$1/month,https://www.skool.com/ai-automations-by-kia/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21.5k Members • $1/month
Skool Speedrun,Free,https://www.skool.com/free/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12k Members • Free
Menopause Skool,Free,https://www.skool.com/menopauseskool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,248 Members • Free
Fighters Community,$39/month,https://www.skool.com/fighters-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,567 Members • $39/month
Neonoir-lux Academy: SOULCODE,$12/month,https://www.skool.com/neonoir-lux-ai-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,72 Members • $12/month
IA CONTENT MASTERY,$49/month,https://www.skool.com/ia-creator-lab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,427 Members • $49/month
The Wealthy Welder Club,$22/month,https://www.skool.com/the-wealthy-welder-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,234 Members • $22/month
ADHD Masters,Free,https://www.skool.com/adhd-masters/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,864 Members • Free
FREE AI SEO Mastermind Group,Free,https://www.skool.com/ai-seo-mastermind-group-3510/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.1k Members • Free
M71 Trading - AlejandroFx,$71/month,https://www.skool.com/mentoria-71-8398/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • $71/month
NWM School Mastermind,Free,https://www.skool.com/network-marketing-school-1537/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,333 Members • Free
New Status Nation,$47/month,https://www.skool.com/newstatus/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,75 Members • $47/month
SWS Private Community,Free,https://www.skool.com/swas-private-community-1576/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.1k Members • Free
English Immersion Academy,$16/month,https://www.skool.com/english-immersion-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,382 Members • $16/month
NDS (No Dumb Sh*t),"$1,397/year",https://www.skool.com/nds-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"206 Members • $1,397/year"
Mentalidad de Fuego,$50/month,https://www.skool.com/mentalidaddefuego/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,452 Members • $50/month
Community Business (german),"$100,000/month",https://www.skool.com/communityaufbau/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"517 Members • $100,000/month"
✨The Galatic Awakening✨,$11/month,https://www.skool.com/new-earth-8955/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,403 Members • $11/month
God Supplied,$5/month,https://www.skool.com/godsupplied/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,801 Members • $5/month
Amazon Private Label Masters,$97/month,https://www.skool.com/privatelabel/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,600 Members • $97/month
Comunidad Fundamentos IA,Free,https://www.skool.com/fundamentos/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,14k Members • Free
Sports Winners Club,$200/month,https://www.skool.com/sba/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,155 Members • $200/month
EasyGrow 2.0™,Free,https://www.skool.com/easygrow/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,602 Members • Free
‎Skoolyard 🧃,Free,https://www.skool.com/yard/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • Free
Vende en Redes Sociales,$47/month,https://www.skool.com/vende-en-redes-sociales-3452/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,259 Members • $47/month
Make the Damn Video Challenge,Free,https://www.skool.com/tamara-gabriel-4636/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,829 Members • Free
FREE WEIGHT LOSS SKOOL,Free,https://www.skool.com/freeweightlossskool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,169 Members • Free
Team Ruff,Free,https://www.skool.com/team-ruff-8631/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,14k Members • Free
The Mindset Academy,$27/month,https://www.skool.com/mindsetacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,398 Members • $27/month
PUMP,"$9,999/year",https://www.skool.com/pump/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"644 Members • $9,999/year"
El Arte de Rediseñarte,$500/year,https://www.skool.com/alessandrolucch/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,202 Members • $500/year
Alive Again Collective,Free,https://www.skool.com/aliveagaincollective-8899/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,157 Members • Free
TappBrothers Fitness Academy,$39/month,https://www.skool.com/tapp-brothers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,478 Members • $39/month
Vicki Planet - Mystery School,$55/month,https://www.skool.com/mysteryschool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,219 Members • $55/month
Pink Print Prep Skool™ (P3),Free,https://www.skool.com/pink-print-prep-skool-p3/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • Free
Wellness Warriors,Free,https://www.skool.com/wellness-warriors-1099/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,365 Members • Free
Stress-Free Sobriety,Free,https://www.skool.com/stress-free-sobriety/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,682 Members • Free
AMZ Certification Program,Free,https://www.skool.com/bjku-fba/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6.1k Members • Free
EDL GALAXY 🌬️,$65/month,https://www.skool.com/edl-galaxy-8898/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,441 Members • $65/month
HolisticAmerican-HealthAcademy,Free,https://www.skool.com/holisticamerican/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.5k Members • Free
Gut Brain Synchrony,Free,https://www.skool.com/chorus-circle/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8.7k Members • Free
The IBS Solution,Free,https://www.skool.com/the-ibs-solution-5925/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,111 Members • Free
Warum wir Menschen so handeln,Free,https://www.skool.com/activity-dj-peter-8834/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,43 Members • Free
InvestCEO Boardroom,"$2,500/year",https://www.skool.com/100-days-to-freedom-journey-3715/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"840 Members • $2,500/year"
VSA Titans,$97/month,https://www.skool.com/vsa-titans/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,108 Members • $97/month
Hustle Games - Philip Johansen,Free,https://www.skool.com/hustlegames/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,25.8k Members • Free
Living as Source,Free,https://www.skool.com/livingassource/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,342 Members • Free
Manifestation Masterclass,$48/month,https://www.skool.com/thesoundofuniverse/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.9k Members • $48/month
Hormone Health Advantage,Free,https://www.skool.com/hormone-health-advantage-4313/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.3k Members • Free
THE PACK,$5/month,https://www.skool.com/pack/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,43 Members • $5/month
Soul Manifestation & Healing,$49/month,https://www.skool.com/scotthaugofficial/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,632 Members • $49/month
Plantiful Life,$10/month,https://www.skool.com/plantifullife/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,302 Members • $10/month
BELONG,Free,https://www.skool.com/belong/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,421 Members • Free
Academia del 1%,$25/month,https://www.skool.com/academia-del-1/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,211 Members • $25/month
JQool 線上英語學院,Free,https://www.skool.com/jqool-1333/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6.1k Members • Free
Breakthrough Elites MasterMind,"$3,000/year",https://www.skool.com/bte/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"98 Members • $3,000/year"
Focus Revolution by ADHDVision,Free,https://www.skool.com/focus-revolution/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • Free
Aprende a Rezar con D. Gozlan,$19/month,https://www.skool.com/aprende-a-rezar-david-gozlan/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,229 Members • $19/month
Happy Healing,"$1,350/year",https://www.skool.com/happyhealing/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"75 Members • $1,350/year"
"Better Man, Better Marriage",$67/month,https://www.skool.com/bettermen/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,71 Members • $67/month
The AI-Driven Business Summit,Free,https://www.skool.com/ai-driven-business-summit/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7.6k Members • Free
Círculo de Autores,Free,https://www.skool.com/autor/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • Free
The Founders Club,Free,https://www.skool.com/the-founders-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,61.7k Members • Free
AI Automation Mastery,Free,https://www.skool.com/ai-automation-mastery-group/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,28k Members • Free
n8n Templates ⭐️,Free,https://www.skool.com/n8n-9859/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • Free
Dispatcher University (Free),Free,https://www.skool.com/gill22/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,18.1k Members • Free
THE $1000 PROTOCOL💸,Free,https://www.skool.com/walford/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,501 Members • Free
MERAKI PROJECT,$33/month,https://www.skool.com/meraki-projectbyjohhnyondina/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,94 Members • $33/month
The Virtual Bookkeeping Series,Free,https://www.skool.com/virtualbookkeepingseries/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,80.7k Members • Free
Anto Ecom Club,$39/month,https://www.skool.com/antoecomclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.3k Members • $39/month
Curso Skool Gratis💰,Free,https://www.skool.com/gratis/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8k Members • Free
Unravelled Knitting Collective,$9/month,https://www.skool.com/unravelled-knitting-collective/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,123 Members • $9/month
Blood & Behavior Advisory,Free,https://www.skool.com/bbadvisory/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,241 Members • Free
God Tier Ecom,$199/month,https://www.skool.com/godtierecom/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,558 Members • $199/month
useful AI,Free,https://www.skool.com/useful-ai/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.9k Members • Free
The school of life,$499/month,https://www.skool.com/the-school-of-life-3234/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,108 Members • $499/month
CLUES,Free,https://www.skool.com/clues/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,234 Members • Free
D&Y Salsa Dance Academy,$59/month,https://www.skool.com/dysalsaacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,723 Members • $59/month
L’École du TOP 1%,Free,https://www.skool.com/ecoledutop1/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.6k Members • Free
DECODE|CORE,$12/month,https://www.skool.com/decodecore/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,508 Members • $12/month
Free Linux Course,Free,https://www.skool.com/linux/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.4k Members • Free
¡Manifiesta tu cuerpo! 🍀,"$10,000/month",https://www.skool.com/manifiesta-tu-cuerpo-8590/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"106 Members • $10,000/month"
Pottery People 💛☕️,Free,https://www.skool.com/pottcast-your-pottery-talk-9668/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,197 Members • Free
Community Creators Club,Free,https://www.skool.com/actiontaker/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6.3k Members • Free
AndyNoCode,Free,https://www.skool.com/andynocode/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,32.1k Members • Free
Photography Community,Free,https://www.skool.com/photography-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.9k Members • Free
UGC World,Free,https://www.skool.com/ugc-world/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10.3k Members • Free
Christ Underground,Free,https://www.skool.com/christ/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9.1k Members • Free
Software Developer Academy,Free,https://www.skool.com/software-developer-academy-5620/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26.5k Members • Free
Challenge OBM Elite,Free,https://www.skool.com/road-to-obm/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • Free
The No Phone Hunt 📵,$40,https://www.skool.com/remote-no-phone-hunt-2306/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,31 Members • $40
CFS Recovery Academy,$297/month,https://www.skool.com/cfs-recovery-academy-1859/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,484 Members • $297/month
Le Club des Nouveaux Éveillés,$33/month,https://www.skool.com/studio-de-meditation/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,371 Members • $33/month
Evolve Now Social,Free,https://www.skool.com/evolve/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.7k Members • Free
Audio Artist Academy,Free,https://www.skool.com/audio-artist-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2k Members • Free
The Vault,Free,https://www.skool.com/stocks/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26.3k Members • Free
SEN6,"$10,000",https://www.skool.com/sen6/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"187 Members • $10,000"
The DIY HUSTLE ACADEMY,$9/month,https://www.skool.com/the-print-plug-academy-6250/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,130 Members • $9/month
SMMA Academy,$27/month,https://www.skool.com/smmacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,294 Members • $27/month
Gemela IA,$49/month,https://www.skool.com/gemelaia/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,514 Members • $49/month
Design mit Struktur & KI,Free,https://www.skool.com/canva/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,425 Members • Free
The crochet circle,Free,https://www.skool.com/caro-stitched-crochet-circle-1164/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,377 Members • Free
LYFTA CLUB,$29/month,https://www.skool.com/lyftaclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • $29/month
School of Content Marketing,$48/month,https://www.skool.com/school-of-content-marketing-5537/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,300 Members • $48/monthAncient Knowledge Academy,$55/month,https://www.skool.com/ancientknowledgeacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,154 Members • $55/month
The Human Practice 💕,Free,https://www.skool.com/thehumanpractice/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,283 Members • Free
Fit Pro Limitless Alpha's,$500,https://www.skool.com/limitless-alphas/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,179 Members • $500
Frozen Fortune Society,Free,https://www.skool.com/water-ice-express-llc-5288/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,348 Members • Free
Mounjarian Tribe 💜,Free,https://www.skool.com/mounjarian-warriors-8467/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,649 Members • Free
Male Commitment Decoded,Free,https://www.skool.com/male-commitment-decoded/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,68 Members • Free
Pinterest Marketing Community,Free,https://www.skool.com/pinterestmarketing/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,340 Members • Free
GROUP HOME MASTERY MENTORSHIP,"$5,000",https://www.skool.com/group-home-mastery-mentorship-9418/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"249 Members • $5,000"
Sync Producer Hub,$67/month,https://www.skool.com/syncproducerhub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,277 Members • $67/month
Daru Strong Club,$1,https://www.skool.com/darustrong/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,359 Members • $1
The Wealth Society,Free,https://www.skool.com/thewealthsociety/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,849 Members • Free
God Ares AI Academy,Free,https://www.skool.com/god-ares-ai-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.5k Members • Free
The RoboNuggets Network (free),Free,https://www.skool.com/robonuggets-free/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,39.5k Members • Free
El Club de la Chicha,"$10,000/month",https://www.skool.com/clubdelachicha/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"328 Members • $10,000/month"
Emprende Con Estilo,$49/month,https://www.skool.com/emprende-con-estilo-2806/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,64 Members • $49/month
THE FORREAL PLACE 🐺,$39/month,https://www.skool.com/the-forreal-place-7482/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,135 Members • $39/month
The Better Brain Project,Free,https://www.skool.com/grace-after-the-storm-6890/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,157 Members • Free
Maru Community 🌳,Free,https://www.skool.com/maru/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,760 Members • Free
Prepper Academy,Free,https://www.skool.com/prepper-academy-8588/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.9k Members • Free
COMUNIDAD DE INCOME TAX,$39/month,https://www.skool.com/comunidaddeincometax/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,368 Members • $39/month
Skate IQ Team,$9/month,https://www.skool.com/skateiq/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • $9/month
W-AI 實戰商學院,Free,https://www.skool.com/wai-school/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.6k Members • Free
Creator Boost Tribe,Free,https://www.skool.com/creatorboost/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9.1k Members • Free
Business Synergy Sisterhood,Free,https://www.skool.com/synergy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.2k Members • Free
Genio Lector,Free,https://www.skool.com/genio-lector/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,19.9k Members • Free
The Reset Circle,Free,https://www.skool.com/theresetcircle/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • Free
Self Organising Organism,Free,https://www.skool.com/jarne/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,92 Members • Free
KI Creator Akademie,"$2,997/year",https://www.skool.com/ki-creator-akademie/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"2.8k Members • $2,997/year"
Skooly,$9/month,https://www.skool.com/skooly/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,261 Members • $9/month
AI Design & Grow Experience,$57/month,https://www.skool.com/etsydesignclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,906 Members • $57/month
Tradetopia Exchange,Free,https://www.skool.com/tradetopia-free-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.6k Members • Free
COMUNIDAD CCA: Dólar x Dólar,$49/month,https://www.skool.com/proyecto90d-1797/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,102 Members • $49/month
Foundations of Ascension,Free,https://www.skool.com/foundations-of-ascension-1699/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9.2k Members • Free
Kahi Family – Eins Sein Leben,Free,https://www.skool.com/kahi-family/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.5k Members • Free
Kirtan Family,Free,https://www.skool.com/learn-kirtan-2365/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.7k Members • Free
AI Launchpad,Free,https://www.skool.com/ai-launchpad/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21.4k Members • Free
Trinity Code ⭐️,$11/month,https://www.skool.com/trinity-code-2714/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,101 Members • $11/month
Team Hustle Flow,Free,https://www.skool.com/team-hustle-flow-5640/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,403 Members • Free
The Menopause Lab,Free,https://www.skool.com/the-menopause-lab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,56.6k Members • Free
Team Activated,$49/month,https://www.skool.com/team-activated/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,253 Members • $49/month
Drini's Vault,Free,https://www.skool.com/drinisvault/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.6k Members • Free
Free BTE Career Coaching,Free,https://www.skool.com/wait/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.7k Members • Free
TrueStrength Fitness,Free,https://www.skool.com/truestrength/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.4k Members • Free
Affiliate Formula,$500/month,https://www.skool.com/formula/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,403 Members • $500/month
Happy-Embodiment-Resilienz,Free,https://www.skool.com/lachen-4798/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,46 Members • Free
Appointment Setting,Free,https://www.skool.com/appointment-setting-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6.5k Members • Free
Vietnam Affiliate Community,$100/month,https://www.skool.com/vietnam-affiliate-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,24 Members • $100/month
FLUENCY MASTERY,Free,https://www.skool.com/fluency-mastery-2540/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,649 Members • Free
TWIERDZA MĘSKIEGO ROZWOJU,Free,https://www.skool.com/wspolnyfront/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • Free
1% Club (Elite),Free,https://www.skool.com/1percentclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,558 Members • Free
Six-Figure Copy Academy,$119/month,https://www.skool.com/sixfigurecopyacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,107 Members • $119/month
Leather Life Community,Free,https://www.skool.com/leatherlifecommunity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.9k Members • Free
TLB INVESTOR,Free,https://www.skool.com/team-tlb/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,183 Members • Free
Social Content Club by Aarii,$25/month,https://www.skool.com/social-content-club-by-aarii-2266/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,115 Members • $25/month
The AI Collective,Free,https://www.skool.com/the-collective-9441/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,360 Members • Free
Becoming Narc-Proof,Free,https://www.skool.com/becoming-narc-proof-2743/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.4k Members • Free
Self Inquiry School,Free,https://www.skool.com/sis/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • Free
Viral Coach Training Material,Free,https://www.skool.com/viral-coach-training-material/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23.7k Members • Free
The Ghost Family,$10/month,https://www.skool.com/the-ghost-family-1230/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,156 Members • $10/month
Sobriety Seven Women,$99/month,https://www.skool.com/sobriety-seven-7269/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,93 Members • $99/month
MYDFIR Forge,$99/month,https://www.skool.com/mydfir/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,164 Members • $99/month
Creatopia,$97/month,https://www.skool.com/creatopia/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,169 Members • $97/month
Blue Ocean Community,$5/month,https://www.skool.com/lbo/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.6k Members • $5/month
AI SEO Mastery with Caleb Ulku,$27/month,https://www.skool.com/ai-seo-mastery/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.3k Members • $27/month
Radiyyah Muslim Growth,Free,https://www.skool.com/ar-radiyyah-4038/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.5k Members • Free
GEM 2.0,Free,https://www.skool.com/gem-grow-earn-multiply-1261/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8.5k Members • Free
Wealth Hub,Free,https://www.skool.com/wealth-hub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,77 Members • Free
Brave Artist Community,$1/month,https://www.skool.com/braveartist/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,288 Members • $1/month
Intune By Britt,Free,https://www.skool.com/intune-by-britt-4294/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,60 Members • Free
Star Monetizers,Free,https://www.skool.com/starmonetizers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,372 Members • Free
AI Experts Club,$47/month,https://www.skool.com/aiexpertsclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.5k Members • $47/month
Breakthrough Publishing,Free,https://www.skool.com/breakthrough-publishing/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.7k Members • Free
AI Twin Society™,$9/month,https://www.skool.com/aicreatorsociety/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • $9/month
DAILY DISCIPLE,Free,https://www.skool.com/daily-disciple-6127/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,670 Members • Free
Ai School,$49/month,https://www.skool.com/aischool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,465 Members • $49/month
DeutschFIT,$9/month,https://www.skool.com/deutschfit/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • $9/month
⚽️ The Female Footballers Club,$12/month,https://www.skool.com/the-female-footballers-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,551 Members • $12/month
Team Unchained Fitness,Free,https://www.skool.com/team-unchained-fitness/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,724 Members • Free
She Prays Global Mentorship,$45/month,https://www.skool.com/she-prays-global-mentorship-9707/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,33 Members • $45/month
AI-Ker | Cộng đồng AI Sáng tạo,$5/month,https://www.skool.com/ai-ker-8924/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.6k Members • $5/month
Her Safe Space,$20/month,https://www.skool.com/bigbrotherruss/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,120 Members • $20/month
HighLevel Vault,$997/year,https://www.skool.com/highlevelvault/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.2k Members • $997/year
Incubateur INFLU IA,$47/month,https://www.skool.com/ofm-ia/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,384 Members • $47/month
La Tribu Divisual,"$100,000/month",https://www.skool.com/la-tribu-divisual/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"2.1k Members • $100,000/month"
The Hard Way Fitness,Free,https://www.skool.com/hardwayfitness/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,50 Members • Free
Imperio Digital,$49/month,https://www.skool.com/imperio-digital/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,658 Members • $49/month
SkoolHers,Free,https://www.skool.com/skoolhers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,579 Members • Free
The Winners Circle,$50/month,https://www.skool.com/kingofkeno/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,63 Members • $50/month
Future Faceless Millionaires,Free,https://www.skool.com/future-faceless-millionaires/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3k Members • Free
Amplify Views,Free,https://www.skool.com/amplifyviews/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,28.3k Members • Free
Shot Academy,$14/month,https://www.skool.com/shotacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,563 Members • $14/month
WavyWorld,Free,https://www.skool.com/wavyworld/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,47.5k Members • Free
Franquicia Digital Formula PVD,$37/month,https://www.skool.com/formula-pvd-4224/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,835 Members • $37/month
10x Youtube,Free,https://www.skool.com/10x-youtube/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.7k Members • Free
AI Workshop,$54/month,https://www.skool.com/aiworkshop/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,582 Members • $54/month
Limitless Training,Free,https://www.skool.com/limitless-training/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.5k Members • Free
The Qroo Spanish Crew,$20/month,https://www.skool.com/qroo/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7k Members • $20/month
Bio Health Peptides Proteins,Free,https://www.skool.com/bio-health-peptides-proteins-9123/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.7k Members • Free
AI Workshop Lite,Free,https://www.skool.com/aiworkshop-lite/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16.8k Members • Free
Influencer Growth Lab,Free,https://www.skool.com/influencer-growth-lab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.4k Members • Free
💰 BE RICH CLUB,$8/month,https://www.skool.com/berichcommunity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • $8/month
Voice AI Bootcamp 🎙️🤖,Free,https://www.skool.com/voice-ai-bootcamp/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8.9k Members • Free
SQX Traders,"$10,000",https://www.skool.com/sqxtraders/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"370 Members • $10,000"
28 Day Action Plan,Free,https://www.skool.com/28-day-action-plan-6088/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,95 Members • Free
Educated Meatheads,Free,https://www.skool.com/educatedmeatheads/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8.2k Members • Free
The Tribe,$14/month,https://www.skool.com/thetribe/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • $14/month
Grow Channels Accelerator,Free,https://www.skool.com/grow-channels/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.2k Members • Free
12x Community,Free,https://www.skool.com/12x-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,263 Members • Free
Alpha School,Free,https://www.skool.com/alpha-school-free-7220/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.4k Members • Free
Brendan's AI Community,Free,https://www.skool.com/brendan/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23.9k Members • Free
Skool Community (deutsch),Free,https://www.skool.com/germanskoolers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.9k Members • Free
The Solopreneur Initiative,Free,https://www.skool.com/the-solopreneur-initiative/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3k Members • Free
The Coven,$27/month,https://www.skool.com/aprimordialwitch/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,530 Members • $27/month
Money Broker Society,Free,https://www.skool.com/credit-free/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13.6k Members • Free
The Chosen Few,$7/month,https://www.skool.com/thechosenfew/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,287 Members • $7/month
Romayroh & Views For Income,$37/month,https://www.skool.com/views-for-income/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.3k Members • $37/month
HOME4FIT,Free,https://www.skool.com/home4fit/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,342 Members • Free
Ecomliberty,Free,https://www.skool.com/ecomliberty-8960/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,45.3k Members • Free
Spiritual Rebels,Free,https://www.skool.com/spiritual-rebels/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.5k Members • Free
True North Aligned,Free,https://www.skool.com/true-north-aligned-life/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,185 Members • Free
Unicorn Closer Mastermind,Free,https://www.skool.com/unicorn-closing-6294/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,103 Members • Free
Trading Tribe,$1/month,https://www.skool.com/tradingtribe/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26.6k Members • $1/month
EGK on Biomechanics,Free,https://www.skool.com/reviv-2885/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.1k Members • Free
Learn and Earn Academy,$54/month,https://www.skool.com/learn-and-earn-academy-2334/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,486 Members • $54/month
ZTH Elite Pro Mentorship,Free,https://www.skool.com/zth-elite-pro-mentorship/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,47 Members • Free
The Peaceful Path,Free,https://www.skool.com/the-peaceful-path-4607/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,127 Members • Free
Guitar Gym Pro,Free,https://www.skool.com/guitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.9k Members • Free
GATHR,Free,https://www.skool.com/gathr/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.3k Members • Free
El Cambio es Hoy,$10/month,https://www.skool.com/elcambioeshoy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,755 Members • $10/month
InvestCEO with Kyle Henris,Free,https://www.skool.com/investceo-with-kyle-henris-4723/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,43.2k Members • Free
Running Drummer LCG,$70/month,https://www.skool.com/running-drummer-lcg-6938/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,80 Members • $70/month
牛軍開門｜股市牛轉門｜進階,$300/month,https://www.skool.com/niu-jun-open-the-door-vip/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,64 Members • $300/month
Level Up Guild,Free,https://www.skool.com/knightfalls-community-6814/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.4k Members • Free
Stretched Fusion,Free,https://www.skool.com/stretched-fusion/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.8k Members • Free
English with Mr. Salas,$49/month,https://www.skool.com/mrsalas/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,469 Members • $49/month
WFH Job Scout,$9/month,https://www.skool.com/wfh-job-scout-3407/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,561 Members • $9/month
Quote Cash Club,Free,https://www.skool.com/quote-cash-club-9244/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,935 Members • Free
🏁 UNDETERRED,Free,https://www.skool.com/undeterred-free-4308/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,687 Members • Free
Jester,"$100,000/month",https://www.skool.com/jerky-vids-1288/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"61 Members • $100,000/month"
Otomasyon Ajans Modeli: DOA,$39/month,https://www.skool.com/doa/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,970 Members • $39/month
Hamilton Dog Training,Free,https://www.skool.com/hamiltondogtraining/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,859 Members • Free
Craft & Connect,Free,https://www.skool.com/craft-and-connect/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.8k Members • Free
FAST&HEALTHY,$33/month,https://www.skool.com/fastandhealthy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,411 Members • $33/month
Main Way to Wealth,Free,https://www.skool.com/monicamain/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17.4k Members • Free
TheActingMasters - InnerCircle,$9/month,https://www.skool.com/theactingmasters/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,157 Members • $9/month
LIBERTY ACADEMY - UNIVERSITY,Free,https://www.skool.com/liberty-academy-game-changer/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,745 Members • Free
Coach Cam's Peptide Academy,$10/month,https://www.skool.com/coach-cams-peptide-academy-3495/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • $10/month
Einfach Neukunden Pro,$97/month,https://www.skool.com/einfach-neukunden/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,136 Members • $97/month
The Prime Seller Blueprint,Free,https://www.skool.com/the-prime-seller-blueprint-6615/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.9k Members • Free
Digital Product Sales School,$37/month,https://www.skool.com/dps/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,462 Members • $37/month
Social Brands Club 3.0,$129/month,https://www.skool.com/sbc/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,347 Members • $129/month
She Attracts Business,$99/month,https://www.skool.com/she-attracts-business/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,889 Members • $99/month
Facebook Ads Mastery,$147/month,https://www.skool.com/facebookads/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,741 Members • $147/month
AI With Alaa (Arabic),$5/month,https://www.skool.com/ai-with-alaa/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,600 Members • $5/month
Excellent Health Academy,$38/month,https://www.skool.com/excellent-health-academy-5370/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,130 Members • $38/month
🔥 PAES 2026 - Admisión 2027,Free,https://www.skool.com/comunidad-paes/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • Free
Kings Hall,"$5,000",https://www.skool.com/kings-hall/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"199 Members • $5,000"
LEARN HYPNOSIS,Free,https://www.skool.com/the-dragons-guild-3986/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,314 Members • Free
5th Dimensional Reiki,Free,https://www.skool.com/5dimensionalreiki/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,658 Members • Free
ĐẦU TƯ TỈNH THỨC,Free,https://www.skool.com/au-tu-tinh-thuc-3530/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,372 Members • Free
PAGINA MILLONARIA,Free,https://www.skool.com/pagina-millonaria/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2k Members • Free
Future Tech Academy,$19/month,https://www.skool.com/fta/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,396 Members • $19/month
The Freedom Builders Circle,Free,https://www.skool.com/the-freedom-builders-circle-2113/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • Free
Rich Habits Network,$77/month,https://www.skool.com/richhabitsnetwork/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,922 Members • $77/month
The Halal Network,Free,https://www.skool.com/islam/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26.1k Members • Free
Mellovator Fam University,$9/month,https://www.skool.com/mfu/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,151 Members • $9/month
The Somatic Reset Lab,Free,https://www.skool.com/somatic/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.1k Members • Free
Affinity Creatives,Free,https://www.skool.com/affinity-photo-creatives-6824/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.3k Members • Free
مجتمع د. فيصل سعود,Free,https://www.skool.com/mfs333/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.9k Members • Free
Only Results 🎯 (CAMPUS),$88/month,https://www.skool.com/only-results-3675/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,14 Members • $88/month
POTT & POTT,Free,https://www.skool.com/pott-pott-7669/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2k Members • Free
Society of Ordinary Gentlemen,Free,https://www.skool.com/society-of-ordinary-gentlemen/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,42 Members • Free
InstaLab.,Free,https://www.skool.com/fib/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,49.3k Members • Free
The Better Man,"$1,995",https://www.skool.com/better-man-elite-7639/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"18 Members • $1,995"
Social Media SkooI,Free,https://www.skool.com/sms/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,562 Members • Free
DIGITAL PROFITS COLLECTIVE,Free,https://www.skool.com/digital-profits-collective/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,472 Members • Free
Woohoo Women's Club,Free,https://www.skool.com/woohoo-womens-club-6740/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,464 Members • Free
The Verada Method,$39/month,https://www.skool.com/the-verada-method/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,394 Members • $39/month
"Earn, Invest, Be Free",$44/month,https://www.skool.com/iderbat/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,901 Members • $44/month
Sketch Like an Architect,Free,https://www.skool.com/sketch-like-an-architect/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.3k Members • Free
One Rental at a Time,$20/month,https://www.skool.com/oraat/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,637 Members • $20/month
SHARKS,$72/month,https://www.skool.com/sharkecomcommunity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,648 Members • $72/month
9x12 Postcard Side Hustle,$44/month,https://www.skool.com/9x12method/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.8k Members • $44/month
Kettlebell Transformation,Free,https://www.skool.com/kettlebell-transformation/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,860 Members • Free
Muslim Marketing Academy,Free,https://www.skool.com/muslim-marketing-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • Free
World Class Sales University,$47/month,https://www.skool.com/wcc-innercircle/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • $47/month
INDIRECTA CLUB,$50/month,https://www.skool.com/indirecta-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,68 Members • $50/month
MikeCaymanTrades,Free,https://www.skool.com/mikecaymantrades-7652/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,156 Members • Free
The Business Lover Academy,$59/month,https://www.skool.com/the-business-lover-academy-1110/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,108 Members • $59/month
FBS - Il Metodo Silvestri,Free,https://www.skool.com/metodosilvestri/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,479 Members • Free
Iniciación Escala,$499/year,https://www.skool.com/iniciacion-escala/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,163 Members • $499/year
THE FREEWAY MECHANICS,$200/month,https://www.skool.com/the-free-way-mechanics-4425/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,139 Members • $200/month
Blue Collar Closer,$49/month,https://www.skool.com/bluecollarcloser/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,350 Members • $49/month
The Basketball Huddle,Free,https://www.skool.com/markhallman/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,883 Members • Free
My BIGG Inner Circle,Free,https://www.skool.com/mybigginnercircle/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,531 Members • Free
Alive Poets Society✍🔥,Free,https://www.skool.com/dead-poets-society-5071/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.7k Members • Free
Main Character Society ⚜️,Free,https://www.skool.com/biohackingheroes/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11.2k Members • Free
Thrive Muslimah,$37/month,https://www.skool.com/thrive-muslimah/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,99 Members • $37/month
HorseMindShift CLUB 🐴,$29/month,https://www.skool.com/horsemindshift/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,210 Members • $29/month
Blackbird PC Tech,$27/month,https://www.skool.com/blackbird-pc-tech/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,66 Members • $27/month
Biohacking Netzwerk (deutsch),Free,https://www.skool.com/biohacking-netzwerk/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.5k Members • Free
laPoesía,$15/month,https://www.skool.com/lapoesia-5876/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,89 Members • $15/month
LIVO CLUB,Free,https://www.skool.com/livarto/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,699 Members • Free
Courier Contract Club,$199/month,https://www.skool.com/couriercontractclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,49 Members • $199/month
Hamza's Automation Incubator™,Free,https://www.skool.com/automate/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,46k Members • Free
FORMACION Growing Masculinity,$120/year,https://www.skool.com/growingmasculinity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • $120/year
Critical Thinking Classroom,$149/month,https://www.skool.com/critical-thinking-classroom-7644/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,278 Members • $149/month
Successful Students,Free,https://www.skool.com/successful-students-5280/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8.6k Members • Free
Six Figure Creators,$399/month,https://www.skool.com/six-figure-creators/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,839 Members • $399/month
The Content Revenue Lab,Free,https://www.skool.com/content-revenue-lab-4761/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,749 Members • Free
IELTS HACKERS,"$10,000/month",https://www.skool.com/hacking-the-ielts-in-2025-6802/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"284 Members • $10,000/month"
Anti Influencer Method™,Free,https://www.skool.com/prc-content-creators-club-5775/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3k Members • Free
XOXA Social,Free,https://www.skool.com/xoxa-social/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,491 Members • Free
ELVOR CORP,$139/month,https://www.skool.com/elvor-corp/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,78 Members • $139/month
La Tribu del Despertar,$29/month,https://www.skool.com/latribudeldespertar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,114 Members • $29/month
Billionaires In Training,Free,https://www.skool.com/billionaires-in-training-8701/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,196 Members • Free
Official Founders Club,$250/year,https://www.skool.com/official-founders-club-9304/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6.6k Members • $250/year
La Maison d'Elohim,$19/month,https://www.skool.com/la-maison-delohim/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,140 Members • $19/month
ZetsuEDU,Free,https://www.skool.com/zetsuedu-7521/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,69 Members • Free
Taukinglish.com,$28/month,https://www.skool.com/taukinglish-7349/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,121 Members • $28/month
John’s English Skool,Free,https://www.skool.com/johns-english-skool-3297/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,148 Members • Free
Progress Hub,Free,https://www.skool.com/progress-hub-3060/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,87 Members • Free
Miniature Painting School,Free,https://www.skool.com/brushandbanner/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.1k Members • Free
Yadari Lab by Yassir,Free,https://www.skool.com/yadarilab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21.7k Members • Free
House of AI,$9/month,https://www.skool.com/production/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.2k Members • $9/month
Trader Cristiano Academy,Free,https://www.skool.com/tradercristiano/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,272 Members • Free
The Trading Cafe,Free,https://www.skool.com/thetradingcafe/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,86.5k Members • Free
Pretty & Paid Playground,Free,https://www.skool.com/pretty-paid-playground-6243/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.9k Members • Free
Mincir avec Riri Keto®,Free,https://www.skool.com/mincir-avec-riri-keto/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.5k Members • Free
Inmersión,$97/month,https://www.skool.com/inmersion/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,30 Members • $97/month
The Low-Carb Health Community,$20/month,https://www.skool.com/low-carb/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,372 Members • $20/month
AI Essentials,Free,https://www.skool.com/ai-essentials/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.6k Members • Free
DNA SHOW Investors Club,Free,https://www.skool.com/dnashow/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.3k Members • Free
Dee’s Peptide Research,$10/month,https://www.skool.com/dees-gpl-1-weightloss-peps-8259/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,255 Members • $10/month
Sherpas Financieros,Free,https://www.skool.com/sherpas-financieros-3685/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,887 Members • Free
Hunderbar OnlyDogs,$12/month,https://www.skool.com/onlydogs/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,275 Members • $12/month
Sales Closer Women,Free,https://www.skool.com/salescloserwomen/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,344 Members • Free
The Sync Alliance,$55/month,https://www.skool.com/the-sync-alliance/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,133 Members • $55/month
HerFaithfulSpace,$7/month,https://www.skool.com/consult-a-muslimah/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,463 Members • $7/month
ONLINE WEALTH ACADEMY,Free,https://www.skool.com/online-wealth-academy-home/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10.6k Members • Free
BrandCollab Latino,$500/month,https://www.skool.com/brandcollab-latino-5292/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,463 Members • $500/month
Beasts Trading,$25/month,https://www.skool.com/beasts-trading-1221/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,59 Members • $25/month
FLI Capital Wealth Academy,Free,https://www.skool.com/fli-capital-1742/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,685 Members • Free
WFHismy𝓕𝓵𝓮𝔁 Inner Circle,$23/month,https://www.skool.com/wfhismy-inner-circle-5948/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • $23/month
Residual Income for Beginners,Free,https://www.skool.com/cashswipe/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.7k Members • Free
AI Automation Circle,Free,https://www.skool.com/the-ai-automation-circle/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9.5k Members • Free
Lazy Sales/AI Closing Code Hub,Free,https://www.skool.com/lazy-salesai-closing-code-hub-6341/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.5k Members • Free
Redeemed Strength,Free,https://www.skool.com/redeemed-strength-1769/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,51 Members • Free
SKOOL PARTNERS ⭐️🚀,Free,https://www.skool.com/skoolgames/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.4k Members • Free
Club Creadores IA,$34/month,https://www.skool.com/ccia/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,258 Members • $34/month
HUG Global,Free,https://www.skool.com/hug/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,227 Members • Free
AI Masters Community with Ed,Free,https://www.skool.com/ai-masters-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12k Members • Free
Sales Systems Mastery,$109/month,https://www.skool.com/ssmasters/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,289 Members • $109/month
The Art of Poetry,Free,https://www.skool.com/the-art-of-poetry-1080/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,241 Members • Free
Patch With Purpose,Free,https://www.skool.com/patchingwithpurpose/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.5k Members • Free
Dropship Unlocked Masterclass,"$6,999/year",https://www.skool.com/dropship-unlocked-masterclass/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"196 Members • $6,999/year"
AI Freedom Accelerator™,Free,https://www.skool.com/digitalfreedommentorship/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.5k Members • Free
مجتمع الإبداع,$149/month,https://www.skool.com/vip-2525/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,56 Members • $149/month
Business Breakthrough,Free,https://www.skool.com/business-breakthrough/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.5k Members • Free
Haddini Aş Kulübü,$50/month,https://www.skool.com/haddinias/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • $50/month
Sin Miedo A Volar,$59/month,https://www.skool.com/sin-miedo-a-volar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,223 Members • $59/month
Billion Dollar Circle (Plus),$99/month,https://www.skool.com/billiondollarcircleplus/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,722 Members • $99/month
Diversified Income University,Free,https://www.skool.com/diversified-incomeuniversity88/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,601 Members • Free
PEACH CLUB,Free,https://www.skool.com/peach-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21.9k Members • Free
E365 Academy,$7/month,https://www.skool.com/e365/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.2k Members • $7/month
Fit Queen Team,$25/month,https://www.skool.com/fitqueenteam/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,253 Members • $25/month
AI MOB SKOOL,$15/month,https://www.skool.com/ai-mob-6583/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,88 Members • $15/month
Academia Handstander,"$10,000/year",https://www.skool.com/academia-handstander/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"289 Members • $10,000/year"
Héroes Club,$90/year,https://www.skool.com/heroesclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,170 Members • $90/year
Billion Dollar Circle,$25/month,https://www.skool.com/bdc/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,27.3k Members • $25/month
La Habitación Roja,$10/month,https://www.skool.com/habitacion-roja/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,897 Members • $10/month
Real Money Club,$25/month,https://www.skool.com/realmoneyclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • $25/month
The Somatic Academy by Soma+IQ,Free,https://www.skool.com/somaticrelease/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,14.1k Members • Free
Serger Dream Club,Free,https://www.skool.com/sergerdreamclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,169 Members • Free
DIGITAL MONETISATION ACADEMY,$39/month,https://www.skool.com/digital-monetisation-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,778 Members • $39/month
The Thrive Job Vault,$9/month,https://www.skool.com/thrive-job-vault-2612/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,102 Members • $9/month
💨The SMQKE Room💨,$59/month,https://www.skool.com/the-smqke-room-4622/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,138 Members • $59/month
comebeadwithme,Free,https://www.skool.com/comebeadwithme/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,989 Members • Free
Strategic Traders,$147/month,https://www.skool.com/strategictraders/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,263 Members • $147/month
Fast Track Trustee,$29/month,https://www.skool.com/fasttracktrustee/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,339 Members • $29/month
Elevated Mentorship,Free,https://www.skool.com/elevated-mentorship/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,383 Members • Free
Tobias Storm - Aktie-Community,$15/month,https://www.skool.com/tobias-storm-aktie/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • $15/month
Дотоод оршихуйн гайхамшиг,Free,https://www.skool.com/dotood-orshihuin-gaihamshig-1050/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • Free
Acreditan2Futuro,$79/month,https://www.skool.com/acreditan2futuro/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,193 Members • $79/month
VIP Ignite Legends,Free,https://www.skool.com/vipignitelegends/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.7k Members • Free
Anxiety Recovery Mentorship,Free,https://www.skool.com/bye-bye-panic-mentorship-2076/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,207 Members • Free
No Theory Club,Free,https://www.skool.com/notheoryclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.4k Members • Free
Wealth Workshop Mar '26,Free,https://www.skool.com/wealth-workshop-mar-26/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,622 Members • Free
Money makers club,$44/month,https://www.skool.com/money-makers-club-3267/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,645 Members • $44/month
AI Artist Lab,Free,https://www.skool.com/ai-artist-lab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,499 Members • Free
AI Automation Agency Ninjas,Free,https://www.skool.com/ai-automation-agency/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20.1k Members • Free
EL CLUB DEL 1%,$47/month,https://www.skool.com/elclubdel1porciento/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,197 Members • $47/month
Ladies of Mycology - LoM,Free,https://www.skool.com/lom/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,652 Members • Free
Digital Origin Community,Free,https://www.skool.com/digitalorigincommunity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.8k Members • Free
The 6-Figure Beauty Society,$28/month,https://www.skool.com/6-figure-beauty-group-4450/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,806 Members • $28/month
Digital Seller's Den,Free,https://www.skool.com/sellers-den/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,612 Members • Free
Spring Into Fitness Challenge,$49/month,https://www.skool.com/trainingtall/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,65 Members • $49/month
Shopify Growth Collective🥂,Free,https://www.skool.com/shopify/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,657 Members • Free
Imperio Digital Academy,$67,https://www.skool.com/imperio-digital-academy-9836/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10.4k Members • $67
MEN's Dating ACADEMY ⭐️🏆,Free,https://www.skool.com/3secondrule/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.3k Members • Free
X10 Manifest & Abundance SKOOL,$40/month,https://www.skool.com/manifesting/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,265 Members • $40/month
The Strong Babes Club,$99/month,https://www.skool.com/strongbabesclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,114 Members • $99/month
The Brand House w/ Able Heart,$97/month,https://www.skool.com/the-brand-house-2251/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,235 Members • $97/month
The Broadcast Room,$27/month,https://www.skool.com/the-broadcast-room/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.7k Members • $27/month
IA MAKERS,$49/month,https://www.skool.com/ia-makers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.4k Members • $49/month
Ai Filmmaking,$5/month,https://www.skool.com/filmmaking/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7k Members • $5/month
Fiel al Plan Club,"$10,000",https://www.skool.com/fielalplan/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"140 Members • $10,000"
Peter's Academy,Free,https://www.skool.com/petersacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6.9k Members • Free
Breakthrough Publishing Pro,$500/month,https://www.skool.com/breakthroughpublishingpro/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,220 Members • $500/month
Meta Ads Performance,$19/month,https://www.skool.com/emdi-performance/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.3k Members • $19/month
LA MEJOR COMUNIDAD CERVECERA,"$99,999/month",https://www.skool.com/la-mejor-comunidad-cervecera-2394/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"108 Members • $99,999/month"
SKOOL 4 Cyclists,$14/month,https://www.skool.com/skool4cyclists/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,219 Members • $14/month
AI Titans,Free,https://www.skool.com/aititans/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,330 Members • Free
Dynamic Trader Mastery,"$1,995",https://www.skool.com/dtm/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"1k Members • $1,995"
PostGraduate Academy,Free,https://www.skool.com/postgraduate-academy-7355/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.7k Members • Free
DK’s Private Business Circle,$50/month,https://www.skool.com/donkilam/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,739 Members • $50/month
Men's Image Lab,$15/month,https://www.skool.com/mens-image-lab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.5k Members • $15/month
The Elite Trainer Academy,$12/month,https://www.skool.com/the-elite-trainer-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.6k Members • $12/month
Roast & Promote 🔥📢,Free,https://www.skool.com/roast-promote-5332/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,134 Members • Free
The Brotherhood™,Free,https://www.skool.com/reclamationprotocol/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8.5k Members • Free
The Game,Free,https://www.skool.com/game/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,801 Members • Free
Mastering.com Members Club,Free,https://www.skool.com/mastering/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,33.8k Members • Free
DETAILING LEGENDS,$20/month,https://www.skool.com/legends/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,136 Members • $20/month
Negocio Capital,$97/month,https://www.skool.com/negociocapital/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,839 Members • $97/month
Spanish Enablers Pro,$49/month,https://www.skool.com/spanish-enablers-pro-5048/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,189 Members • $49/month
Millionaire Mindset,$100/month,https://www.skool.com/mmc/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • $100/month
Sobriety With Kelly,Free,https://www.skool.com/kelly/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,214 Members • Free
Apex Pro 24,$997,https://www.skool.com/stakingpro24/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,332 Members • $997
Expanding Capacity,$49/month,https://www.skool.com/expandingcapacity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,228 Members • $49/month
The AI Surfer Circle,$194/month,https://www.skool.com/theaisurfer/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,918 Members • $194/month
Confidence & Self Mastery,$49/month,https://www.skool.com/coach-kyle-all-access-2204/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,750 Members • $49/month
The School of Prophets,$39/month,https://www.skool.com/the-school-of-prophets-5157/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,251 Members • $39/month
Trade AI LIVE,$299/month,https://www.skool.com/cashflowlive/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • $299/month
雷諾曼卓越者生態圈｜LEL,Free,https://www.skool.com/lenormand-lel/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,137 Members • Free
Creators Academy - Identity,Free,https://www.skool.com/creators-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,46 Members • Free
Apostolic Eagles,Free,https://www.skool.com/eagles/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,31 Members • Free
Spencer Financial Group,Free,https://www.skool.com/spencer-financial-group-9600/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,146 Members • Free
Awesome! Hybrid Calisthenics,Free,https://www.skool.com/awesome-ninja-fitness/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,735 Members • Free
Kettlebell Dojo By Lebe Stark,"$2,497",https://www.skool.com/kettlebell-dojo/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"901 Members • $2,497"
KI Marketing Club,"$3,500",https://www.skool.com/ki-marketing-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"1k Members • $3,500"
Pathway To Salesforce (PTS),Free,https://www.skool.com/pathway-to-salesforce/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,690 Members • Free
Oracle Cards Magic™,$33/month,https://www.skool.com/oraclecardsclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.5k Members • $33/month
The New Rich,Free,https://www.skool.com/thenewrich/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12.4k Members • Free
Triple S |Build & Sell with AI,$1/month,https://www.skool.com/abdalla-majdi-8449/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.6k Members • $1/month
P2P Mastery,$49/month,https://www.skool.com/p2p-mastery/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,275 Members • $49/month
Manifest from Wholeness,$37/month,https://www.skool.com/manifest-from-wholeness-6840/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,295 Members • $37/month
The Drawing Guild,Free,https://www.skool.com/the-drawing-guild/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • Free
DIGI DOLLARS SOCIETY,Free,https://www.skool.com/digidollarssociety/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.4k Members • Free
🎵 Music Funding Academy,Free,https://www.skool.com/musicfundingacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,675 Members • Free
AI Writing Easy AF for Authors,Free,https://www.skool.com/ai-writing-easy-af/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,564 Members • Free
Reverse Selling - Inner Circle,"$10,000/year",https://www.skool.com/reverseselling-innercircle/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"955 Members • $10,000/year"
Elevate,$50/month,https://www.skool.com/elevate-5907/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,167 Members • $50/month
Heilraum Natur - Natürlich Du,Free,https://www.skool.com/mit-jessica-naturlich-du-1361/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,71 Members • Free
Paid Ad Secrets,Free,https://www.skool.com/paid-ad-secrets/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,18.6k Members • Free
Couple's Growth Skool,$97/month,https://www.skool.com/couples-growth-official-4160/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,463 Members • $97/month
Fit Pro Alpha Tribe ( FREE ),Free,https://www.skool.com/fit-pro-alpha-tribe/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.5k Members • Free
Passeport Club,$19/month,https://www.skool.com/passeportclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,78 Members • $19/month
Fat Burning Ninjas,$10/month,https://www.skool.com/tumehe-6498/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,395 Members • $10/month
OFM Conquest,Free,https://www.skool.com/ofmconquest/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21.2k Members • Free
Liberty Foundation,$50/month,https://www.skool.com/liberty-foundation-1659/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,302 Members • $50/month
Hundefotografie Deutschland,Free,https://www.skool.com/hundefotografie-deutschland/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,361 Members • Free
CashSwipe Client Mastermind,Free,https://www.skool.com/cashswipe-clients/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • Free
Cloud Tech Techniques,Free,https://www.skool.com/cloudtechexec/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10.7k Members • Free
Camping Wilderness Skool,Free,https://www.skool.com/camping-wilderness-skool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,158 Members • Free
OS Architect,Free,https://www.skool.com/osarchitect/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11k Members • Free
School of SOC,Free,https://www.skool.com/schoolofsoc/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,698 Members • Free
Mindset Skool,$49/month,https://www.skool.com/mindsetskool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,294 Members • $49/month
Escuela de la Mutación,$19/month,https://www.skool.com/escuela-mutacion/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.8k Members • $19/month
Alex Binarias Gratuitas!,Free,https://www.skool.com/alex-curso-quotex-1517/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,227 Members • Free
Viegas Academy PRO⚡,"$9,999/month",https://www.skool.com/viegas-academy-4891/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"238 Members • $9,999/month"
The Transurfing Skool,Free,https://www.skool.com/blue-collar-mystics-5366/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.5k Members • Free
The SLD TRIBE,Free,https://www.skool.com/thesldtribe/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.5k Members • Free
Business Astrology Hub,Free,https://www.skool.com/cosmic-clarity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,590 Members • Free
🪴 Cozy Plants 🌱🌼🌿☘️,Free,https://www.skool.com/cozi-8805/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,87 Members • Free
Brainz Magazine Publicity & PR,Free,https://www.skool.com/brainz-magazine-publicity-pr/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.8k Members • Free
Empfehlungs-Marktplatz,$27/month,https://www.skool.com/empfehlungs-marktplatz-9029/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,132 Members • $27/month
Empower Business Growth,$349/month,https://www.skool.com/businessaufbau/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,213 Members • $349/month
Método AIRA,$17/month,https://www.skool.com/metodoaira/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,603 Members • $17/month
AI Accelerator,Free,https://www.skool.com/systems-to-scale-9517/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,18k Members • Free
eKereskedelem.com,Free,https://www.skool.com/ekereskedelem/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,64.6k Members • Free
VoCreations UGC Mentorship,$59/month,https://www.skool.com/ugc-vo-creators-4824/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,76 Members • $59/month
Comunidad WaySuccess,Free,https://www.skool.com/waysuccess/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,109.1k Members • Free
The WinnerTraders Cycle,$100/month,https://www.skool.com/the-winnertraderscycle-4120/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,71 Members • $100/month
The Justice League,Free,https://www.skool.com/justice-league-5036/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • Free
Programme d'accompagnement,$59/month,https://www.skool.com/programme-daccompagnement-4473/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,91 Members • $59/month
The Reverse Engineer,Free,https://www.skool.com/reverse-engineer-9251/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.8k Members • Free
Nikon User Community,$9/month,https://www.skool.com/nikon-user-community-3738/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,38 Members • $9/month
LBT March 2026,Free,https://www.skool.com/lbt/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,340 Members • Free
E-Commerce For All,$39/month,https://www.skool.com/e-commerce-for-all/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,580 Members • $39/month
SINGLE 2 MARRIED,$97/month,https://www.skool.com/single2married/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,50 Members • $97/month
theSpecialist.ai,Free,https://www.skool.com/the-specialist-foundation-7820/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,37 Members • Free
Empresarios Digitales,Free,https://www.skool.com/empresarios-digitales/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,14.7k Members • Free
Círculo de Éxito,$20/month,https://www.skool.com/circulodeexito/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,32 Members • $20/month
Moggmaxx,$28/month,https://www.skool.com/moggmaxx/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,203 Members • $28/month
BLACK SUIT MUSIC,$15/month,https://www.skool.com/blacksuitmusic/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,595 Members • $15/month
""АЙЛ БҮРТ ӨРХ"" НИЙГЭМЛЭГ,Free,https://www.skool.com/ailbur-community-8320/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,937 Members • Free
The Next Chapter,$97/month,https://www.skool.com/the-next-chapter/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,467 Members • $97/month
Pilas Academy VIP,$47/month,https://www.skool.com/pilas-academy-vip/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,153 Members • $47/month
Moroccan Hustlers,$47/month,https://www.skool.com/moroccan-hustlers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,546 Members • $47/month
Off-Market Dating System,$5/month,https://www.skool.com/men-of-action-free/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6.3k Members • $5/month
Kaya ᜃ🎋,Free,https://www.skool.com/kaya/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,743 Members • Free
Self-Improvement Challenge,Free,https://www.skool.com/bsg-4603/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7.1k Members • Free
Transactional Funding Roadmap,Free,https://www.skool.com/roadmap/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8.3k Members • Free
AI投資情報站｜AI提示詞+ 官方社群,Free,https://www.skool.com/ai-invest-3220/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.1k Members • Free
Alvorian foundation,Free,https://www.skool.com/alvorian-foundation-9015/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,57 Members • Free
Health Business Accelerator,Free,https://www.skool.com/health-business-accelerator-8656/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,287 Members • Free
Alla's Lily Study Corner,$3/month,https://www.skool.com/allalily/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,410 Members • $3/month
ACADÉMIE PROVENTE,Free,https://www.skool.com/academie-provente-5454/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9.1k Members • Free
Soul Purpose Group,Free,https://www.skool.com/soulpurpose/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.8k Members • Free
Speak and Grow Rich Bootcamp,Free,https://www.skool.com/speakandgrowrichcommunity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,485 Members • Free
Headlight Restoration School,$50/month,https://www.skool.com/headlightrestorationschool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,511 Members • $50/month
1% Club (Lite),Free,https://www.skool.com/1percentclublite/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,253 Members • Free
Pets Mascotas 💙🐾🌍 PetPals,$9/month,https://www.skool.com/pets-mascotas/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,22 Members • $9/month
Exploring Peptides MEMBERSHIP,$15/month,https://www.skool.com/exploring-peptides/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,759 Members • $15/month
AMIA I Academia Modelos IA,"$10,000",https://www.skool.com/amia/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"469 Members • $10,000"
🎮 OnlyLANs Gaming Group,Free,https://www.skool.com/only-lans-5300/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,123 Members • Free
No Sugar Nation,$97,https://www.skool.com/no-sugar-nation/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.9k Members • $97
Hollywood Marketing University,$20/month,https://www.skool.com/hollywoodmarketinguniversity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,217 Members • $20/month
The MindBender Method™-Sales,Free,https://www.skool.com/sales-edge-6257/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.2k Members • Free
Create Faceless Wealth,Free,https://www.skool.com/createfacelesswealth/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.5k Members • Free
GovTech Community (Free),Free,https://www.skool.com/govtechgroup/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20.6k Members • Free
Vix Queenkim Academy,$100/month,https://www.skool.com/vix-queenkim-academy-8367/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,36 Members • $100/month
Social Selling with Sam,Free,https://www.skool.com/samrathling/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,648 Members • Free
Bobo's Coaching Program,$29/month,https://www.skool.com/boboscoaching/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,111 Members • $29/month
MSTR Generational Wealth,$97/month,https://www.skool.com/mstr/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,155 Members • $97/month
850Club ELITE Credit Education,$67/month,https://www.skool.com/850-club-credit-1279/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,160 Members • $67/month
Healing Space ✧ Science + Soul,Free,https://www.skool.com/trauma-to-trust-6348/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,66 Members • Free
Multifamily Wealth Skool,Free,https://www.skool.com/multifamilywealthnation/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16.6k Members • Free
Global Healing Summit,Free,https://www.skool.com/healing-millions/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.4k Members • Free
Nexus Academy + ClicChat,$50/month,https://www.skool.com/nexus-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,329 Members • $50/month
Skool Owners Lounge,Free,https://www.skool.com/skool-owners-lounge/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,230 Members • Free
Boxwave Club,$25/month,https://www.skool.com/boxwave-club-6200/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,162 Members • $25/month
uFOUNDERS,"$10,000",https://www.skool.com/aprendetube/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"150 Members • $10,000"
High Achievers,Free,https://www.skool.com/high-achievers-6315/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17.5k Members • Free
Assistable.ai,Free,https://www.skool.com/assistable/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.4k Members • Free
Aktienscout-Community,Free,https://www.skool.com/cybermoney-1123/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,148 Members • Free
LindaPaige,Free,https://www.skool.com/lindapaige/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.7k Members • Free
KDP Publishing,Free,https://www.skool.com/kdp-publishing/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,830 Members • Free
Team Navy Seal Trading,$59/month,https://www.skool.com/edgartrader/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,112 Members • $59/month
Music Biz,Free,https://www.skool.com/rap-school-6608/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.7k Members • Free
The Mystic Misfits Society,Free,https://www.skool.com/the-mystic-misfits-society/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7.8k Members • Free
Freedom Achievers,$279/month,https://www.skool.com/freedom-achievers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,390 Members • $279/month
Менторска програма Марти,$350/year,https://www.skool.com/my-mentorship/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,426 Members • $350/year
CEO Society,Free,https://www.skool.com/swceo-5704/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.1k Members • Free
Argent Alpha,Free,https://www.skool.com/argent-alpha/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,207 Members • Free
Oracle Boxing,$37/month,https://www.skool.com/boxing/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,179 Members • $37/month
Fowl,Free,https://www.skool.com/fowl-4704/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • Free
Growth Squad Heroes,Free,https://www.skool.com/we-help-you-find-your-tribe/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,257 Members • Free
PUT YOUR ADS HERE,$10/month,https://www.skool.com/put-your-ads-here-3644/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,58 Members • $10/month
Traffic Sales and Profit,Free,https://www.skool.com/trafficsalesandprofit/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.5k Members • Free
IDALL LITE,$9/month,https://www.skool.com/idall-lite-1529/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • $9/month
Scale School,Free,https://www.skool.com/scaleschool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,166 Members • Free
OnlinePénz,$999,https://www.skool.com/onlinepenz/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,499 Members • $999
Le Chéile Music Piano Group,Free,https://www.skool.com/le-cheile-music/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,417 Members • Free
RISE & RENEW with ROSHANNA,$18/month,https://www.skool.com/rise-renew-roshanna/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,48 Members • $18/month
BuildUp Bootcamp,Free,https://www.skool.com/buildupworkshop/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11.3k Members • Free
Angel B. Academy,Free,https://www.skool.com/angel-b-academy-4622/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,839 Members • Free
The Canvas Vandals,Free,https://www.skool.com/canvas-vandals/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.8k Members • Free
Vortex - Incubateur,Free,https://www.skool.com/vortex-incubateur-2986/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,791 Members • Free
Automatable Free,Free,https://www.skool.com/automatable-free/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6.2k Members • Free
Digital Products Academy,Free,https://www.skool.com/digital-products-academy-3815/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5.7k Members • Free
The Married Ambition Alliance,Free,https://www.skool.com/the-married-ambition-alliance/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,31 Members • Free
Adversity Beaters🏦🆙🔥,$197/month,https://www.skool.com/adversitybeaters/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,351 Members • $197/month
SKOOL AUSTRIA,Free,https://www.skool.com/skool-austria-8797/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,190 Members • Free
Online Biz Growth (No Social),Free,https://www.skool.com/online-biz-growth/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • Free
3D Farmers,$15/month,https://www.skool.com/3dfarmers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,399 Members • $15/month
🏛️ Cimientos Empresariales,"$10,000",https://www.skool.com/cimientos-empresariales-8392/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"68 Members • $10,000"
GUERRERAS TIROIDEAS,$39/month,https://www.skool.com/guerreras-tiroideas/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,288 Members • $39/month
ONA Basecamp,$10/month,https://www.skool.com/ona-basecamp/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,152 Members • $10/month
Real Estate Institute-Belize,Free,https://www.skool.com/realestateinstituteofbelize/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,82 Members • Free
l'École des freelances,$150,https://www.skool.com/lecole-des-freelances-3433/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.5k Members • $150
Fertility Girl Gang,$7/month,https://www.skool.com/fertility-girl-gang-1327/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,352 Members • $7/month
Brand Within a Brand,$10/month,https://www.skool.com/brand-within-a-brand-4934/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,300 Members • $10/month
Unlock Brand,$59/month,https://www.skool.com/unlock-brand-5293/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,84 Members • $59/month
WFH BESTIE COMMUNITY!!💻🥰,Free,https://www.skool.com/digital-boss-babes-4651/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.5k Members • Free
Merch Mastermind,$64/month,https://www.skool.com/merch-mastermind/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,254 Members • $64/month
ScaleHer Community,$37/month,https://www.skool.com/scaleher-community-3157/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,253 Members • $37/month
Elaborate Runners,Free,https://www.skool.com/elaboraterunners/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,162 Members • Free
Becoming Better Muslims,Free,https://www.skool.com/muslims/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • Free
GenMax Academy™,Free,https://www.skool.com/genmax-academy-8297/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4k Members • Free
La Manada del Vínculo,$39/month,https://www.skool.com/la-manada-del-refugio-7563/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,51 Members • $39/month
Modern Dating Mastery,Free,https://www.skool.com/mdm/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.8k Members • Free
pHERmission public,Free,https://www.skool.com/public/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • Free
The.Beautiful.Community,$17/month,https://www.skool.com/thebeautifulcommunity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,753 Members • $17/month
Jewelry IQ with Threefortytwo,Free,https://www.skool.com/jewelryiq/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,472 Members • Free
The Peptide Collective,$75,https://www.skool.com/the-peptide-collective/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,284 Members • $75
خلك فاهم,$99/month,https://www.skool.com/kfahm-7175/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,579 Members • $99/month
UGC Glow up✨,Free,https://www.skool.com/ugc30-challenge-9769/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.5k Members • Free
Sứ Mệnh Kim Cương,$5/month,https://www.skool.com/dmi/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,329 Members • $5/month
Semper Execute,Free,https://www.skool.com/semperexecute/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,108 Members • Free`;

const MUSIC_CSV = `community_name,price,community_url,total_members
Unison Producer Growth Hub,Free,https://www.skool.com/unison-producer-growth-hub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,44.6k Members • Free
Pocket Singers Free,Free,https://www.skool.com/pocketsingersfree/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17.4k Members • Free
VoiceOver School,$47/month,https://www.skool.com/voiceoverschool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,376 Members • $47/month
V1B1N Tribe 🌸🧜‍♀️🍉🦋🔆🕺💕,Free,https://www.skool.com/v1b1n/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,575 Members • Free
52 Week Guitar Player 3.0,"$2,400/year",https://www.skool.com/52weekguitarplayer/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"416 Members • $2,400/year"
Key Learners Piano Club,Free,https://www.skool.com/keylearners/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • Free
Basterd Crew,$9/month,https://www.skool.com/basterd/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,66 Members • $9/month
Piano with Rebecca B,$12/month,https://www.skool.com/pianowithrebeccab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,340 Members • $12/month
SHREDDERS UNIVERSITY 2.0,$127/month,https://www.skool.com/shreddersuni2/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,134 Members • $127/month
Audio Artist Academy,Free,https://www.skool.com/audio-artist-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2k Members • Free
Sync Producer Hub,$67/month,https://www.skool.com/syncproducerhub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,277 Members • $67/month
Kirtan Family,Free,https://www.skool.com/learn-kirtan-2365/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.7k Members • Free
Guitar Gym Pro,Free,https://www.skool.com/guitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.9k Members • Free
The Sync Alliance,$55/month,https://www.skool.com/the-sync-alliance/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,133 Members • $55/month
No Theory Club,Free,https://www.skool.com/notheoryclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.4k Members • Free
Mastering.com Members Club,Free,https://www.skool.com/mastering/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,33.8k Members • Free
🎵 Music Funding Academy,Free,https://www.skool.com/musicfundingacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,675 Members • Free
The Reverse Engineer,Free,https://www.skool.com/reverse-engineer-9251/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.8k Members • Free
BLACK SUIT MUSIC,$15/month,https://www.skool.com/blacksuitmusic/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,595 Members • $15/month
Music Biz,Free,https://www.skool.com/rap-school-6608/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.7k Members • Free
Le Chéile Music Piano Group,Free,https://www.skool.com/le-cheile-music/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,417 Members • Free
Flute Nerd Lab,Free,https://www.skool.com/flute-nerd-lab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,382 Members • Free
Producer Pathway,Free,https://www.skool.com/producer-pathway-9447/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7.6k Members • Free
Marthyn's Drum Camp,$49/month,https://www.skool.com/marthyn/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,346 Members • $49/month
Gitar Kampüs,$10/month,https://www.skool.com/gitar-kampus/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,107 Members • $10/month
Pro Gig Academy (Plus),$150/month,https://www.skool.com/pro-gig-academy-plus/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,105 Members • $150/month
Fretboard Freedom,Free,https://www.skool.com/garyleemusic-2716/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,340 Members • Free
Pocket Singers Elite,$49/month,https://www.skool.com/pocketsingerselite/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,141 Members • $49/month
The Spark,$127/month,https://www.skool.com/the-spark/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,101 Members • $127/month
Flamenco Guitar Foundations™,$69/month,https://www.skool.com/familia-flamenca-academy-8089/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,57 Members • $69/month
🎻 Luthiers Mastermind Lab 💫,$89/month,https://www.skool.com/luthiers-mastermind-lab-9094/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,37 Members • $89/month
REDLUX ACADEMY,Free,https://www.skool.com/redlux-records-6343/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,157 Members • Free
Louis' Trumpet Academy,$49/month,https://www.skool.com/louis-trumpet-academy-6100/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,182 Members • $49/month
Pro Gig Academy,Free,https://www.skool.com/pro-gig-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.4k Members • Free
All About Guitar Academy,$47/month,https://www.skool.com/allaboutguitaracademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,79 Members • $47/month
SHREDDERS UNIVERSITY (LITE),Free,https://www.skool.com/shredders-university-lite/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.9k Members • Free
Music Money,Free,https://www.skool.com/muzic-money-1508/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4.7k Members • Free
Guitarristas Entre Cuerdas,Free,https://www.skool.com/guitarristas-entre-cuerdas-4279/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,217 Members • Free
Precision Brass Mastermind,Free,https://www.skool.com/precision-brass-mastermind/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,103 Members • Free
PIANO WALKERS,$29/month,https://www.skool.com/pianowalkers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,178 Members • $29/month
The Free Producer,Free,https://www.skool.com/the-free-producer/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,231 Members • Free
Clarity Guitar Studio,Free,https://www.skool.com/clarityguitarstudio/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,122 Members • Free
Omni Guitars,Free,https://www.skool.com/omni-guitars/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.4k Members • Free
LPR: The Business of Audio,Free,https://www.skool.com/sound-foundations-8658/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,130 Members • Free
NotaMühendisi Müzik Akademisi,$59/month,https://www.skool.com/notamuhendisi/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,113 Members • $59/month
Chase's Guitar Academy,$59/month,https://www.skool.com/cga/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,197 Members • $59/month
CTRL Camp Learn Sync Licensing,$10/month,https://www.skool.com/ctrlcamp/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,348 Members • $10/month
Learn Guitar By Creating Music,Free,https://www.skool.com/udiguitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,340 Members • Free
Dave's Guitar World,$35/month,https://www.skool.com/davesguitarworld/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,144 Members • $35/month
Artistic Guitar Bootcamp,$169/month,https://www.skool.com/burntune/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,28 Members • $169/month
bansuri community,Free,https://www.skool.com/bansuri-school-by-linus-8573/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,109 Members • Free
Trap Producers,Free,https://www.skool.com/trapproducers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,945 Members • Free
ShowLAB Writers' Studio,Free,https://www.skool.com/showlab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,346 Members • Free
La Tribu Del Sonido,$9/month,https://www.skool.com/la-tribu-del-sonido/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,196 Members • $9/month
Easy Piano In Five Days,$29/month,https://www.skool.com/5-day-piano-challenge/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.5k Members • $29/month
Guitar for Beginners,$29/month,https://www.skool.com/beginnerguitar-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,130 Members • $29/month
DJ CLUB,"$10,000/year",https://www.skool.com/club-dj/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"78 Members • $10,000/year"
Unison Platinum Club,$37/month,https://www.skool.com/unison-platinum-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,304 Members • $37/month
靴子跟貓 Boots and Cats,Free,https://www.skool.com/beatbox/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,242 Members • Free
The JazzMind Accelerator Lab,Free,https://www.skool.com/the-jazzmind-accelerator-lab-7526/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,57 Members • Free
Oboe Path,Free,https://www.skool.com/oboe-path/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • Free
The Composers' Studio,Free,https://www.skool.com/the-composer-training-program-7684/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,111 Members • Free
Academia Sergio Masterclass,$12/month,https://www.skool.com/academia-sergiomasterclass/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,51 Members • $12/month
Boyka Unreleased,$9/month,https://www.skool.com/boyka-unreleased-7525/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,110 Members • $9/month
Sound Horizon Academy Elite,$47/month,https://www.skool.com/soundhorizonacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,246 Members • $47/month
The Practice Formula for Flute,Free,https://www.skool.com/the-practice-formula-8143/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
The Practice Room - Free,Free,https://www.skool.com/the-practice-room/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • Free
Clever Gitarre lernen Club,$19/month,https://www.skool.com/gitarre-lernen-leicht/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,48 Members • $19/month
Templo de Ingeniería Musical,"$10,000/month",https://www.skool.com/ingenieria-musical/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"346 Members • $10,000/month"
Stewart's Songwriting Studio,Free,https://www.skool.com/stewarts-songwriting-studio-8690/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • Free
The Blues/Rock Soloing Studio,Free,https://www.skool.com/blues-rockguitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,943 Members • Free
Artist Bootcamp,$29/month,https://www.skool.com/artistbootcamp/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,165 Members • $29/month
The Voice Acting Academy,$29/month,https://www.skool.com/the-voice-acting-academy-4050/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,59 Members • $29/month
Absolute Guitar Ave,$59/month,https://www.skool.com/absoluteguitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20 Members • $59/month
Quiet Hours,Free,https://www.skool.com/quiethours/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,205 Members • Free
𝗧he 𝗠odern 𝗔rtist Network,Free,https://www.skool.com/tmafree/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,953 Members • Free
LA TRIBU DJ,"$9,999",https://www.skool.com/latribudj/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"180 Members • $9,999"
Event Entrepreneurs,$49/month,https://www.skool.com/event-entrepreneurs/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,185 Members • $49/month
No Labels Necessary,Free,https://www.skool.com/nolabelsnecessaryofficial/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6.3k Members • Free
Instant DJ,Free,https://www.skool.com/instantdj/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,39 Members • Free
Producer Union +,$99/month,https://www.skool.com/producer-union-plus/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,81 Members • $99/month
Signal Guitar Skool,Free,https://www.skool.com/signal-guitar-skool-5759/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,30 Members • Free
The Keys Club,$15/month,https://www.skool.com/thekeysclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.9k Members • $15/month
Producer Pathway VIP,$97/month,https://www.skool.com/producer-pathway-vip-4416/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,219 Members • $97/month
Şarkı Söyle,$17/month,https://www.skool.com/ses/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,95 Members • $17/month
New Earth DJ Academy,$26/month,https://www.skool.com/new-earth-music-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,167 Members • $26/month
Pere Hernàndez Music,$10/month,https://www.skool.com/pere-hernandez-music-3569/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26 Members • $10/month
Better Chords Academy,Free,https://www.skool.com/betterchords/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,760 Members • Free
Pretend Choir,Free,https://www.skool.com/pretend-choir-5987/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,469 Members • Free
Bach Skool of Voice,Free,https://www.skool.com/voice/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,156 Members • Free
Worship Guitar Mastery,$6/month,https://www.skool.com/worshipguitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,317 Members • $6/month
Ukulele Nerds,Free,https://www.skool.com/ukulele/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,98 Members • Free
Circle of Interval Magicians,$18/month,https://www.skool.com/circle-of-interval-magicians/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,93 Members • $18/month
FLUTARIAN IMPROVISATION,Free,https://www.skool.com/improvisationstation-9400/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,101 Members • Free
Vocal Activate Live Studio,Free,https://www.skool.com/vocal-activate-freeclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • Free
Shred Theory Mastery,Free,https://www.skool.com/classical-shred-theory-mastery-9815/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,33 Members • Free
The M Tea Studio,$2/month,https://www.skool.com/transformationalsongwriting/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,377 Members • $2/month
Flow Tribe,Free,https://www.skool.com/flow-tribe/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,255 Members • Free
Mix & Momentum,Free,https://www.skool.com/mix-momentum-1166/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,81 Members • Free
Alex's Acoustic Club,$25/month,https://www.skool.com/alexs-acoustic-club-5005/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,338 Members • $25/month
World Jazz Drumming Experience,Free,https://www.skool.com/world-jazz-drumming-experience-3668/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,38 Members • Free
El Camino del DJ,$49/month,https://www.skool.com/elcaminodeldj/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,289 Members • $49/month
下班後的吉他手,Free,https://www.skool.com/nick-7030/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,120 Members • Free
Rhythm Skool,Free,https://www.skool.com/rhythm-skool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.4k Members • Free
(Free) Music Funding Academy,Free,https://www.skool.com/freemusicfundingacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.9k Members • Free
Story-First Songwriters,Free,https://www.skool.com/storytelling-in-songwriting-3212/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,186 Members • Free
The Modern DJ Academy,$49/month,https://www.skool.com/mda/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,144 Members • $49/month
Church Sound Class,Free,https://www.skool.com/church-sound-class-5932/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,244 Members • Free
eXplorers 🚀,Free,https://www.skool.com/innovate-5678/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,57 Members • Free
Dark Label Music,Free,https://www.skool.com/darklabelmusic/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,264 Members • Free
Free Music Production Course,Free,https://www.skool.com/upcfree/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,414 Members • Free
Jazz Guitar Vault,Free,https://www.skool.com/jazzguitarvault/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,328 Members • Free
Kingdom Music Academy,$49/month,https://www.skool.com/kma/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,163 Members • $49/month
The Chorus,Free,https://www.skool.com/the-chorus/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,275 Members • Free
Christian Artist Breakthrough,Free,https://www.skool.com/christian-artist-breakthrough-6024/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,928 Members • Free
RYME RECORDS,$50/month,https://www.skool.com/ryme-records-1071/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,50 Members • $50/month
The School of Guitar,Free,https://www.skool.com/theschoolofguitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,99 Members • Free
The Gospel University,Free,https://www.skool.com/gospel-university/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,379 Members • Free
DOXA | Academia de Música,$32/month,https://www.skool.com/doxa/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,371 Members • $32/month
Your Truth Amplified,Free,https://www.skool.com/your-truth-amplified-2143/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,43 Members • Free
Sync Made Simple,Free,https://www.skool.com/sync-made-simple/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,118 Members • Free
The Drum Shed,Free,https://www.skool.com/drum-shred-2962/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,58 Members • Free
🎓EduardosMusic Academy,$47/month,https://www.skool.com/eduardosmusic-academy-9200/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,51 Members • $47/month
The Sync Vault,Free,https://www.skool.com/syncvault/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,194 Members • Free
Songwriting Secrets,Free,https://www.skool.com/the-melody-experiment-4288/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,139 Members • Free
Fear Less Spontaneous Music,Free,https://www.skool.com/music-making-and-performance-2480/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,38 Members • Free
Fans to Funds,Free,https://www.skool.com/fanstofunds/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,673 Members • Free
Priority Music Academy,Free,https://www.skool.com/priority-music-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,857 Members • Free
REGGAE BASS CLUB,$27/month,https://www.skool.com/riddim-up-reggae-bass-2293/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,85 Members • $27/month
a cappella,Free,https://www.skool.com/acappella/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,15 Members • Free
Drumset Mastery,$750/month,https://www.skool.com/drumsetmastery/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,39 Members • $750/month
Big Band Hivemind,Free,https://www.skool.com/lead-sheet-to-large-ensemble-9464/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,66 Members • Free
Explore NMB 🎵 🎶,Free,https://www.skool.com/explorenmb/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,252 Members • Free
The Creative Bass Camp,Free,https://www.skool.com/creativebasscamp/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • Free
Український клуб гітаристів,$23/month,https://www.skool.com/ignatov-music-guitar-community-1692/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,54 Members • $23/month
Fundamentally Flute,Free,https://www.skool.com/fundamentally-flute-9595/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • Free
GuitarZoom,Free,https://www.skool.com/guitarzoom/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3.3k Members • Free
EDM Artists Launchpad,$17/month,https://www.skool.com/diviners-studio-session-1587/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,25 Members • $17/month
The Practice Room,$99/year,https://www.skool.com/practiceroom/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • $99/year
Get Saxxy 🎷 (Ücretsiz),Free,https://www.skool.com/get-saxxy-4157/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,191 Members • Free
Intermediate Guitar,Free,https://www.skool.com/intermediate-guitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,80 Members • Free
Learning Jazz Violin,Free,https://www.skool.com/jazzviolin/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,317 Members • Free
Music Minded,Free,https://www.skool.com/music-minds-1349/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23 Members • Free
Sync Money Skool,$72/month,https://www.skool.com/sync-money-skool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,66 Members • $72/month
Die Producer Bubble,$47/month,https://www.skool.com/die-producer-bubble-3301/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • $47/month
Piano4Producers Academy,$997,https://www.skool.com/piano4producers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,850 Members • $997
Unleash Your Inner Guitar Hero,Free,https://www.skool.com/unleash-your-inner-guitar-hero-9928/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,66 Members • Free
Medicine Music School,Free,https://www.skool.com/medicine-music-school/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,54 Members • Free
Artist Circle (Singing Studio),$32/month,https://www.skool.com/singing-studio-8675/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10 Members • $32/month
The Baritone Lab,$29/month,https://www.skool.com/thebaritonelab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,22 Members • $29/month
Grateful Mike's VIP Club,$289/month,https://www.skool.com/gratefulmikevip/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,51 Members • $289/month
ESCUELA DE MINISTERIO MUSICAL,$9/month,https://www.skool.com/escuela-de-ministerio-musical-3699/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,51 Members • $9/month
Guitar Mastery (Skyline Music),$29/month,https://www.skool.com/12-weeks-to-campfire-strumming-2409/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,108 Members • $29/month
Jazz Violin Academy,Free,https://www.skool.com/jazz-violin-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,535 Members • Free
Artist Academy 🎓 🎵 (Music),$65/month,https://www.skool.com/artistsacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,59 Members • $65/month
Guitar Alchemy,Free,https://www.skool.com/guitaralchemy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,204 Members • Free
The Complete Bassist,Free,https://www.skool.com/bass/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.1k Members • Free
Müzik Üniversitesi,Free,https://www.skool.com/muzik-universitesi-8281/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.9k Members • Free
Free Gold Level Private Group,Free,https://www.skool.com/goldlevel/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.5k Members • Free
PULSR - Inner Circle,Free,https://www.skool.com/pulsr/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,39 Members • Free
Bass Brief,Free,https://www.skool.com/bass-brief/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,877 Members • Free
Top 50 Solo Gigging Setlist,$27,https://www.skool.com/top-50-solo-gigging-setlist-3213/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,475 Members • $27
SOFA TO THE STAGE,Free,https://www.skool.com/sofa-to-the-stage-4095/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • Free
United By Metal,Free,https://www.skool.com/possessed-by-metal-6201/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,131 Members • Free
The Anthem Network,$33/month,https://www.skool.com/theanthemnetwork/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,54 Members • $33/month
Bite Size Music Academy,Free,https://www.skool.com/bite-size-music-academy-2975/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23 Members • Free
Audio Done Right,Free,https://www.skool.com/audiodoneright/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,188 Members • Free
Learn To Drum With Tom,$15/month,https://www.skool.com/learn-to-drum-with-tom-2462/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • $15/month
Music Streaming University,Free,https://www.skool.com/music-streaming-university-6552/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,138 Members • Free
WeAreMusicProducers,Free,https://www.skool.com/wearemusicproducers-7436/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,43 Members • Free
Guitar Lab,Free,https://www.skool.com/guitar-lab-7329/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,32 Members • Free
Gato Jazz Lite,Free,https://www.skool.com/gatojazz/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.1k Members • Free
The Shawn Lane Guitar Method,Free,https://www.skool.com/shawnlane/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,34 Members • Free
DSI Inner Circle,Free,https://www.skool.com/dream-sound-inner-circle-9349/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,71 Members • Free
School of Drummers (EXCLUSIVE),$27/month,https://www.skool.com/drum/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,14 Members • $27/month
Guitar Bui Ngoc Son,Free,https://www.skool.com/guitar-bui-ngoc-son-2829/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,492 Members • Free
Musician Get Songs Done,Free,https://www.skool.com/musiciangsd/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,359 Members • Free
Gato Jazz Pro 🐱,$52/month,https://www.skool.com/gatojazzpro/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,52 Members • $52/month
Grateful Mike's Premium Club,$49/month,https://www.skool.com/gratefulmike/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,84 Members • $49/month
Strum Bowing Groove Academy,Free,https://www.skool.com/strum-bowing-groove-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,258 Members • Free
MPC Flow State,Free,https://www.skool.com/mpc-flow-state-9226/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,94 Members • Free
The Worship Life Collective,Free,https://www.skool.com/the-worship-life-collective-8118/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,274 Members • Free
The Artist Circle PRO,Free,https://www.skool.com/theartistcircle/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,69 Members • Free
Creative's Flow,Free,https://www.skool.com/creatives-flow-4525/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,257 Members • Free
BMSC Sounding Board,$5,https://www.skool.com/bmsc-sounding-board-4810/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,44 Members • $5
Mack's Music Collective,Free,https://www.skool.com/macks-sax-academy-2637/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,41 Members • Free
The Social Media Blueprint,$175/month,https://www.skool.com/thesocialmediablueprint/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,27 Members • $175/month
Grateful Mike's Guitar Club,Free,https://www.skool.com/grateful-mikes-starter-club-4571/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,951 Members • Free
The Jazz Intensive,Free,https://www.skool.com/the-jazz-intensive-4361/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23 Members • Free
Trumpet Karaoke +,Free,https://www.skool.com/trumpet-karaoke-7194/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • Free
Cinematic Music Made Easy,Free,https://www.skool.com/cinematic-music-made-easy-4623/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,202 Members • Free
Music Staffroom,Free,https://www.skool.com/musicstaffroom-7867/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,160 Members • Free
Music Transcription Hangout,Free,https://www.skool.com/music-transcription-hangout-1755/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,387 Members • Free
EDMProd Mastermind Community,Free,https://www.skool.com/edmprod/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.8k Members • Free
The Vaughn George Music Lab,Free,https://www.skool.com/the-vaughn-george-music-hub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,146 Members • Free
Chris Parks TILF Barry Harris,$59/month,https://www.skool.com/chris-parks-tilf-barry-harris/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,29 Members • $59/month
Fingerstyle Tab Club,Free,https://www.skool.com/fingerstyle-tab-club-8917/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,462 Members • Free
Studio Raphael | Creative Dojo,$25/month,https://www.skool.com/monthly-songwriting-challenge-4626/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,27 Members • $25/month
Sound Horizon Academy (Free),Free,https://www.skool.com/soundhorizonacademyfree/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.3k Members • Free
Good People Club University,$15/month,https://www.skool.com/gpcu/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,228 Members • $15/month
Piano with Ease 🎹,Free,https://www.skool.com/piano-with-ease/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,240 Members • Free
PRODUCTEUR À SUCCÈS-MUZISECUR,Free,https://www.skool.com/producteur-a-succes-3363/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.2k Members • Free
David Brand Saxophone Academy,Free,https://www.skool.com/david-brand-saxophone-academy-2339/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23 Members • Free
Rhythm Lab Teacher Hub,Free,https://www.skool.com/rhythm-lab-teacher-hub-3572/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
AI for Musicians,Free,https://www.skool.com/ai4m-6354/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,264 Members • Free
DJ ACADEMY ONLINE,"$10,000/year",https://www.skool.com/djacademyonline/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"82 Members • $10,000/year"
Fanbase University,"$2,000/month",https://www.skool.com/fanbase-university-7878/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"38 Members • $2,000/month"
مجتمع ابوصوت,Free,https://www.skool.com/abo9ot-school-of-sounds-2447/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.4k Members • Free
Navigate Tinnitus,Free,https://www.skool.com/navigate-tinnitus/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,150 Members • Free
Studio Team (KZMS),Free,https://www.skool.com/kaizen-music-studio-9377/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,90 Members • Free
Pianosso,Free,https://www.skool.com/pianosso/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • Free
Secret Piano Games,Free,https://www.skool.com/piano/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,453 Members • Free
Musicwork.com,Free,https://www.skool.com/musicwork/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,990 Members • Free
Producer Mastery,Free,https://www.skool.com/producer-mastery-6333/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,28 Members • Free
美聲蜕變學院 🦋 （美聲演唱＋科學發聲）,Free,https://www.skool.com/vocal-transformations/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,462 Members • Free
Brass Masters Society,Free,https://www.skool.com/infobrassmasterssocietycom-4193/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
Steirische Harmonika Premium,$49/month,https://www.skool.com/steirischeharmonika-premium/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,32 Members • $49/month
Prolific Producer Collective,Free,https://www.skool.com/pickyourself/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,120 Members • Free
Guitar Solo Skool,Free,https://www.skool.com/guitarists/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,335 Members • Free
UNIVERSAL GUITARIST,"$10,000/year",https://www.skool.com/universal-guitarist/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"38 Members • $10,000/year"
Studio Vocals At Home,$15/month,https://www.skool.com/studiovocals/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,22 Members • $15/month
Haddy Music,Free,https://www.skool.com/haddy-music-9967/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,35 Members • Free
Trailer & Sync Lab,$27/month,https://www.skool.com/groovegym/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,93 Members • $27/month
IndependentRappers.com,Free,https://www.skool.com/independentrappers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,249 Members • Free
Working Musicians Academy,Free,https://www.skool.com/working-musicians-academy-7345/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
The Dreamers,Free,https://www.skool.com/the-dreamers-community-6971/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,572 Members • Free
Folk Fingerstyle Mastery,$500/month,https://www.skool.com/finger-style-from-scratch-6585/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,22 Members • $500/month
Platinum Level University,$47/month,https://www.skool.com/plu/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,130 Members • $47/month
The Song Circle,$39/month,https://www.skool.com/thesongcircle/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,168 Members • $39/month
The Voice Gym,$29/month,https://www.skool.com/voicegym/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,102 Members • $29/month
𝗧he 𝗠odern 𝗔rtist 𝗢𝗦 🏁,$47/month,https://www.skool.com/tma/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,49 Members • $47/month
The Brush Lab,Free,https://www.skool.com/the-brush-lab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,289 Members • Free
Worship Singers Pro,$9/month,https://www.skool.com/worship-singers-6699/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,134 Members • $9/month
Steirische Harmonika,Free,https://www.skool.com/steirischeharmonika/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,317 Members • Free
LA ARMERÍA JP Y LAS CUERDAS,$42/month,https://www.skool.com/guerrerojp/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • $42/month
The Trumpet Comeback Chops 🎺,Free,https://www.skool.com/thetrumpetcomebackchops/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,375 Members • Free
🎵 Music Launchpad Academy,$57/month,https://www.skool.com/musiclaunchpadacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,48 Members • $57/month
Secret Sessions,"$1,200/year",https://www.skool.com/secret-sessions-mentorship-3452/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"21 Members • $1,200/year"
Musicwork Pro,$150/month,https://www.skool.com/musicwork-pro/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,29 Members • $150/month
тʀи эс,$25/month,https://www.skool.com/bbff-6132/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,207 Members • $25/month
Kaouflow's Guitar Lab,$25/month,https://www.skool.com/kaouflows-guitar-lessons-4330/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • $25/month
Solo Guitar - Taking It All In,Free,https://www.skool.com/solo-guitar-taking-it-all-in/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
Mastering Guitar Fluency,Free,https://www.skool.com/joinnow/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,108 Members • Free
Painless & Fearless Pianists,$49/month,https://www.skool.com/painless-fearless-pianists-3871/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,62 Members • $49/month
SoundRise Academy Studios,$29/month,https://www.skool.com/soundrise-academy-6684/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,32 Members • $29/month
Confident Clarinetists Club,"$6,000/year",https://www.skool.com/confidentclarinetistsclub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"16 Members • $6,000/year"
🎵Musik und Freude im Alltag🎶,Free,https://www.skool.com/singen-macht-glucklich-heilt-7351/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,43 Members • Free
Jazz Drum Set Q/MUNITY,$20/month,https://www.skool.com/jazzdrumming/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,56 Members • $20/month
Universidad de Guitarra,$20/month,https://www.skool.com/universidad-de-guitarra/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,250 Members • $20/month
Guitar Success Path 🎸 Private,"$19,954",https://www.skool.com/guitarsuccesspath/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"6 Members • $19,954"
Sing Musical Theatre Pro,"$1,145/month",https://www.skool.com/singpro/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"11 Members • $1,145/month"
The Music Producer Community,Free,https://www.skool.com/mastering-the-music-industry-5093/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,438 Members • Free
The Empowered Vocalist,Free,https://www.skool.com/the-empowered-vocalist-3325/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,342 Members • Free
Learn Gypsy Jazz,Free,https://www.skool.com/learn-gypsy-jazz-7166/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,146 Members • Free
Guitar Building Blocks,Free,https://www.skool.com/guitar-building-blocks/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2.3k Members • Free
MusikWolke7,Free,https://www.skool.com/musikwolke7/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,19 Members • Free
The Global Brass Collective,$49/month,https://www.skool.com/timos-brass-circle-1123/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,95 Members • $49/month
The Classical Voice (FREE),Free,https://www.skool.com/the-peak-performing-vocalist-5404/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,291 Members • Free
Chevi Muzic University,$10/month,https://www.skool.com/chevi-muzic-university-4995/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,57 Members • $10/month
Jazz Skool,Free,https://www.skool.com/jazz-skool-8858/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,850 Members • Free
Choral Clarity Collective,$19/month,https://www.skool.com/choral-clarity-mentorship-4913/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,89 Members • $19/month
Elevate Your Craft,Free,https://www.skool.com/elevate-your-craft/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,155 Members • Free
The Jooba People,Free,https://www.skool.com/joobaguitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,393 Members • Free
The Self Producing Composer,Free,https://www.skool.com/self-producing-composer/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,62 Members • Free
Jazz Guitar Fluency Program,Free,https://www.skool.com/jazz-guitar-fluency-program-5888/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • Free
Bebop Made Simple,Free,https://www.skool.com/guitarmin-school-1922/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,381 Members • Free
8&IN Champions,Free,https://www.skool.com/champions/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,35 Members • Free
Altar Worship Community,Free,https://www.skool.com/altar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,181 Members • Free
Min線上鋼琴學習,Free,https://www.skool.com/min-5118/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,24 Members • Free
The Craft House - songwriting,$7/month,https://www.skool.com/thecrafthouse/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,47 Members • $7/month
Alex Mazur Jazz Improvisation,Free,https://www.skool.com/alex-mazur-jazz-improvisation-9945/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • Free
The Warburton Music Studio,Free,https://www.skool.com/the-warburton-music-studio-6835/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • Free
RICH $EEN ARTIST,Free,https://www.skool.com/finnishers-club-7197/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,22 Members • Free
Paint the Noise (PTN) Pulse,Free,https://www.skool.com/ptn-pulse-6707/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,113 Members • Free
Music Mastery,$17/month,https://www.skool.com/guitar-gang-music-maestros-5041/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,300 Members • $17/month
Sound Guy 101,Free,https://www.skool.com/wyatt-productions-7118/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,194 Members • Free
Bass Singer Academy,$497/year,https://www.skool.com/basssingeracademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,68 Members • $497/year
Wisdom Harps,$29/month,https://www.skool.com/wisdom-harps-9618/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,50 Members • $29/month
The Ensemble,$997/year,https://www.skool.com/the-ensemble/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,18 Members • $997/year
The Choral Music Hub,Free,https://www.skool.com/the-choral-musician-hub-5631/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26 Members • Free
Hitmaker Collective,$233/month,https://www.skool.com/hitmakercollective/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,15 Members • $233/month
Marimba Mastery,Free,https://www.skool.com/stevens-technique-mastery/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • Free
The Loop Academy,Free,https://www.skool.com/the-loop-academy-8824/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,110 Members • Free
The Vocal Lab,$29/month,https://www.skool.com/the-vocal-lab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,27 Members • $29/month
Dave Smith Rhythm Academy,Free,https://www.skool.com/dave-smith-rhythm-academy-3086/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10 Members • Free
Marksman Producer Accelerator,Free,https://www.skool.com/marksman-producer-accelerator/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,286 Members • Free
Full Time Music Producers,Free,https://www.skool.com/full-time-music-producers-5789/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,276 Members • Free
Playback Community,Free,https://www.skool.com/playback-community-9570/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,753 Members • Free
The Jam Tribe,Free,https://www.skool.com/jamband/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
Story-First Songwriting,Free,https://www.skool.com/story-first-songwriting-1742/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • Free
The Music Clock Guitar Club,Free,https://www.skool.com/the-music-clock-guitar-club-5082/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • Free
Maestría de Guitarra - VIP,$17/month,https://www.skool.com/maestria-de-guitarra-9073/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,41 Members • $17/month
TubaBass,$129/month,https://www.skool.com/tubabass/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,22 Members • $129/month
The Gig Ready Guitarist,Free,https://www.skool.com/the-gig-ready-guitarist-4642/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • Free
Guitar Revival,$10/month,https://www.skool.com/aaga-courses-8992/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,122 Members • $10/month
Producer Accelerator,Free,https://www.skool.com/musicpreneur/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,77 Members • Free
Elite Backbeat Brotherhood,Free,https://www.skool.com/elite-backbeat-brotherhood-6119/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
The Jazz School,Free,https://www.skool.com/improvising-drummer-academy-5006/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,30 Members • Free
BuzzPiano Academy,$29/month,https://www.skool.com/buzzpiano-academy-8656/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,179 Members • $29/month
Boogie Woogie Mastery,Free,https://www.skool.com/boogie-woogie-mastery/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,66 Members • Free
Modern Mixing School,Free,https://www.skool.com/modernmixing/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,112 Members • Free
ViolinOS,Free,https://www.skool.com/violinos/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,88 Members • Free
Judiths Piano Family,Free,https://www.skool.com/judiths-piano-family-2777/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,971 Members • Free
De La Guitarra a la Música,Free,https://www.skool.com/de-la-guitarra-a-la-musica-7695/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,97 Members • Free
Flute Forum,Free,https://www.skool.com/fluteforum/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,149 Members • Free
Artists That Sell,$99/month,https://www.skool.com/artists-that-sell-6370/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,165 Members • $99/month
THE BASS PERSPECTIVE,Free,https://www.skool.com/the-bass-perspective-2011/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,28 Members • Free
The Secret- Eduardosmusic,$597,https://www.skool.com/the-secret-eduardosmusic-3684/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,35 Members • $597
Loop Waves,$19/month,https://www.skool.com/loopwaves/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,84 Members • $19/month
Actually Sounds,Free,https://www.skool.com/actually-sounds-3551/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20 Members • Free
BtP Guitarists (Free),Free,https://www.skool.com/btpforfree/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,113 Members • Free
梅楣音樂坊( 流行演唱+科學發聲) Vocal,Free,https://www.skool.com/meimeimusic/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,471 Members • Free
Sample Academy,$25/month,https://www.skool.com/sample-academy-7406/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • $25/month
The Gatekeepers,$57/month,https://www.skool.com/the-gatekeepers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13 Members • $57/month
Oboe School,Free,https://www.skool.com/oboe-school/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,462 Members • Free
The Guitar Dojo,Free,https://www.skool.com/the-guitar-dojo/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,80 Members • Free
Music Production Mastery,Free,https://www.skool.com/music-production-mastery/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1k Members • Free
From Theory To Fretboard,Free,https://www.skool.com/from-theory-to-fretboard-4226/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,56 Members • Free
Coristas Pro,$25/month,https://www.skool.com/segundas-voces-para-iglesias-8990/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,57 Members • $25/month
ZERMELO,Free,https://www.skool.com/zermelo/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,671 Members • Free
Armin Mir Mentorship,Free,https://www.skool.com/guitarmin-premium/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,91 Members • Free
The Needle & The Damage Done,Free,https://www.skool.com/the-needle-the-damage-done-2714/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
Meta Mind Music,Free,https://www.skool.com/meta-mind-music-9812/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,719 Members • Free
Beyond Distortion,Free,https://www.skool.com/drum-and-bass-producers-7354/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,318 Members • Free
The Practice Room Pro,$197/month,https://www.skool.com/the-practice-room-pro/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,39 Members • $197/month
Academia de Pian online,$449,https://www.skool.com/academia-online-de-pian/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • $449
Wortfunken - MicroLyrik Klang,Free,https://www.skool.com/wortfunken-microlyrik-klang-4617/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,29 Members • Free
Unstoppable Producer,$100/month,https://www.skool.com/upc/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,27 Members • $100/month
Skool For Musicians,Free,https://www.skool.com/skoolformusicians/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,62 Members • Free
Drum School for Adults,Free,https://www.skool.com/mjs-drumheads-club-8535/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,40 Members • Free
Dance Music,Free,https://www.skool.com/trance-music-8286/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
Soul Meets Spirit Collective,$9/month,https://www.skool.com/soul-meets-spirit-collective-1400/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,15 Members • $9/month
The COPET Academy,$147/month,https://www.skool.com/thecopetacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,98 Members • $147/month
Witness the Light Mix Academy,Free,https://www.skool.com/witness-the-light-mix-academy-7758/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,39 Members • Free
The Independent Pianist Circle,Free,https://www.skool.com/the-self-taught-pianist-circle-7074/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,54 Members • Free
The Art Of Djing,Free,https://www.skool.com/the-art-of-djing-4344/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,337 Members • Free
Industry Set,Free,https://www.skool.com/industry-set-5232/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,929 Members • Free
The Harmonium Evolution,Free,https://www.skool.com/harmonium-evolution/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,810 Members • Free
The Grammy Family 🎹,Free,https://www.skool.com/the-family-5150/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,566 Members • Free
mauve* | par Sébastien Corn,$29/month,https://www.skool.com/mauve/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,39 Members • $29/month
Flatpicking Guitar Mastery,$30/month,https://www.skool.com/flatpickingfrazier/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12 Members • $30/month
Comunidad ""Natural Singers"",Free,https://www.skool.com/natural-singers-7950/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,121 Members • Free
Fulltime Music Academy,$600/month,https://www.skool.com/fulltime-music-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,145 Members • $600/month
Song Writing Hub,Free,https://www.skool.com/song-writing-acadamy-2564/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,63 Members • Free
Drumline Academy,Free,https://www.skool.com/school-of-drummers-4820/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,217 Members • Free
Breakthrough Piano Club,Free,https://www.skool.com/breakthrough-piano-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,42 Members • Free
The ADHD Musician,Free,https://www.skool.com/the-adhd-musician-9191/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • Free
Club Vocal,Free,https://www.skool.com/transformacion-vocal/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,338 Members • Free
BVP | Técnica Pianística,$7/month,https://www.skool.com/pianistas-bvp-1003/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,63 Members • $7/month
Guitar Skool,Free,https://www.skool.com/guitar-skool-6475/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,56 Members • Free
Boring Guitar Club,Free,https://www.skool.com/boring-guitar-club-8772/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
ZONE O.S.,$999/month,https://www.skool.com/zoneos/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,36 Members • $999/month
SongCraft Collective,Free,https://www.skool.com/songcraft/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,39 Members • Free
Choral Composer Collective,Free,https://www.skool.com/choral-composer-collective-9792/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,39 Members • Free
Rose Cello Studio,Free,https://www.skool.com/rose-music-studio-orchestra-7010/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
Melody,Free,https://www.skool.com/melody-5631/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,85 Members • Free
Trumpet Mastery Tier 2,"$6,000",https://www.skool.com/trumpet-mastery-7351/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"27 Members • $6,000"
Arnold Music - Guitar Academy,Free,https://www.skool.com/arnold-academy-8894/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,37 Members • Free
Cool Jazz Styles,Free,https://www.skool.com/cool-jazz-styles/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20 Members • Free
Loop To Label,$500/month,https://www.skool.com/loop-to-label-vip/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,29 Members • $500/month
Tabla Evolution,$29/month,https://www.skool.com/texastabla-3913/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20 Members • $29/month
Modern Rock & Metal Songwriter,$65/month,https://www.skool.com/modernrockandmetalsongwriter/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,31 Members • $65/month
Footwork Academy,Free,https://www.skool.com/the-drummers-launchpad-1541/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,439 Members • Free
guitarwavers,Free,https://www.skool.com/guitarwavers-1668/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,50 Members • Free
Academia musical Entona🎤,$27/month,https://www.skool.com/academia-entona-5493/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,401 Members • $27/month
TCM GREEN ROOM,Free,https://www.skool.com/tcm-green-room/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,28 Members • Free
Sunday Mix Pro,$9/month,https://www.skool.com/sundaymix-6099/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,148 Members • $9/month
The Hub,$10/month,https://www.skool.com/cc-membership-1213/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,82 Members • $10/month
Lackie Productions Studio,Free,https://www.skool.com/lackie-productions-studio-4504/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13 Members • Free
The Piano Composers Club,Free,https://www.skool.com/the-piano-composers-club-6886/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12 Members • Free
Producelo,$15/month,https://www.skool.com/producelo-6696/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,85 Members • $15/month
En Tu Orilla,$19/month,https://www.skool.com/en-tu-orilla-2981/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,15 Members • $19/month
Synth Nerds United,Free,https://www.skool.com/synth-nerds-united-6424/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,76 Members • Free
Rock Singing Success,Free,https://www.skool.com/rocksingingsuccess/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,233 Members • Free
HARMONY DJ ACADEMY,$120/month,https://www.skool.com/universidad-del-dj-9124/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,34 Members • $120/month
Play The Music You Imagine!,Free,https://www.skool.com/play-the-music-you-imagine-2977/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,306 Members • Free
AM Vocal Academy,Free,https://www.skool.com/the-singers-forum-4906/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,343 Members • Free
Online Jam,Free,https://www.skool.com/online-jam-6255/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21 Members • Free
Szabad Zenetanulás Exkluzív,$49/month,https://www.skool.com/szabad-zenetanulas-7325/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,40 Members • $49/month
ZERMELO System,$49/month,https://www.skool.com/zermelo-system/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,14 Members • $49/month
SONORA+,Free,https://www.skool.com/studio-virtuel-8936/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,90 Members • Free
Amateur to Pro Music,Free,https://www.skool.com/amateur-to-pro-music/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,36 Members • Free
Liederliebe by Musik Wagner,Free,https://www.skool.com/lieder-liebe-by-musik-wagner-5502/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,81 Members • Free
Guitarra Efectiva Skool,$20/month,https://www.skool.com/guitarra-efectiva-skool-6557/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • $20/month
DJ + Music Producer Hub,Free,https://www.skool.com/dj-music-producer-hub-3485/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10 Members • Free
Thriving Guitarist,Free,https://www.skool.com/thriving-guitarist-6790/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • Free
PaulMcKayONEvoice,$8/month,https://www.skool.com/paulmckayonevoice-1414/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,42 Members • $8/month
The Drum Community,Free,https://www.skool.com/drums/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,595 Members • Free
Home Studio Recording School,$19/month,https://www.skool.com/recording-for-the-rest-of-us-8018/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,108 Members • $19/month
The Vocal Academy,$199/month,https://www.skool.com/thevocalacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,37 Members • $199/month
Play JAZZ Masterclass,Free,https://www.skool.com/play-jazz-7237/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,18 Members • Free
Voice Box Fitness Vocal Gym,"$3,200/year",https://www.skool.com/voiceboxfitness/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"409 Members • $3,200/year"
Saxophon Campus Basic,Free,https://www.skool.com/saxophon-campus-basic/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26 Members • Free
RTW: Artists and Producers,$22/month,https://www.skool.com/rtw-6495/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,158 Members • $22/month
Keyboard Wizardry,$19/month,https://www.skool.com/unlock-the-keyboard/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,483 Members • $19/month
Mr. C's Music Academy,Free,https://www.skool.com/mr-cs-music-academy-3109/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,182 Members • Free
Scales for Metalheads Ultimate,Free,https://www.skool.com/scales-for-metalheads/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,322 Members • Free
Els Artist Academy,Free,https://www.skool.com/elsartistacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,168 Members • Free
The Language of the Drum,Free,https://www.skool.com/the-language-of-the-drum-1425/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • Free
The Guitar Academy,Free,https://www.skool.com/the-guitar-academy-8968/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,90 Members • Free
Automate DMX™,$349/year,https://www.skool.com/music/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,37 Members • $349/year
Chas Evans - Guitar 101,$15/month,https://www.skool.com/guitar-101-8629/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,97 Members • $15/month
Indie Amplify VIP,$28/month,https://www.skool.com/indievip/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23 Members • $28/month
Deed Music Community,Free,https://www.skool.com/edutech-4272/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,311 Members • Free
Tuba Mastery Online,Free,https://www.skool.com/tuba-mastery-online-6358/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
Ictus Institute,$18/month,https://www.skool.com/ictus-7754/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,19 Members • $18/month
Guitar Development Global Arts,Free,https://www.skool.com/guitardevelopmentglobalarts/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,47 Members • Free
Learning Jazz Piano Community,$240/year,https://www.skool.com/jazzpiano/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,67 Members • $240/year
JZ Microphones Community,Free,https://www.skool.com/jz-microphones-community-4344/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.6k Members • Free
The Worship & Writing Room,$5/month,https://www.skool.com/the-worship-writing-room-8007/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • $5/month
Alfa DJ's Center,Free,https://www.skool.com/alfa-djs-center-3577/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,68 Members • Free
BATTERIE CLUB,Free,https://www.skool.com/batterie-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,171 Members • Free
Selim Yanbaş Müzik Akademisi,Free,https://www.skool.com/gitar-cal-beste-yap-3409/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,60 Members • Free
So You Wanna Rap!,Free,https://www.skool.com/so-you-wanna-rap-1591/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,73 Members • Free
The Pit Society,Free,https://www.skool.com/civ-9990/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,22 Members • Free
Chill Producers,Free,https://www.skool.com/chill-producers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,460 Members • Free
Branson Smith’s Music School,$2/month,https://www.skool.com/branson-smiths-music-school-3907/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $2/month
Gig Proof,$26/month,https://www.skool.com/gigproof/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • $26/month
Produce Electrónica 40+,$100/month,https://www.skool.com/musica-electronica-para-40-7851/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,32 Members • $100/month
Making The Line,Free,https://www.skool.com/making-the-line-4943/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,54 Members • Free
Key Vocal - Singing Skills,Free,https://www.skool.com/key-vocal/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,117 Members • Free
Music-Prod Producer Hub,Free,https://www.skool.com/musicprod-2735/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,494 Members • Free
Ms Alisha B Songwriting Hub,Free,https://www.skool.com/ms-alisha-b-songwriting-ac-4596/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,28 Members • Free
🎶 Keys to Piano Success,Free,https://www.skool.com/keys-to-piano-success/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • Free
The Songwriters Collective,Free,https://www.skool.com/the-song-lab-1085/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • Free
Mystic Vessel Guitar,Free,https://www.skool.com/mystic-vessel-guitar-1283/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,35 Members • Free
Biz Tips for Gigging Musicians,Free,https://www.skool.com/booklive-users-6450/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,68 Members • Free
Put the Fiddle in the Middle,Free,https://www.skool.com/put-the-fiddle-in-the-middle-2416/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
Fretboard Freedom - Gold Class,Free,https://www.skool.com/fretboard-freedom-gold-class/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,155 Members • Free
Do Music Full Time™,Free,https://www.skool.com/do-music-full-time-1249/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,322 Members • Free
The Clay Instrument Workshop,Free,https://www.skool.com/the-clay-instrument-workshop-9271/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,18 Members • Free
Who Broke The Speakers!?,Free,https://www.skool.com/who-broke-the-speakers-2410/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
Harpejji Discovery Hub,Free,https://www.skool.com/harpejji-discovery-hub-5874/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,47 Members • Free
Yuto's Jazz Guitar Studio,$25/month,https://www.skool.com/yutos-jazz-guitar-studio-8390/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • $25/month
Toaldo Violin School,Free,https://www.skool.com/toaldo-violin-school-7320/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,174 Members • Free
Ollie's Bass Lessons,$19/month,https://www.skool.com/ollies-bass-lessons-7403/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • $19/month
Bachata Musicality by Dmitrii,$40/month,https://www.skool.com/bachatamusicality/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,113 Members • $40/month
Guitar Groovers 🤟,$15/month,https://www.skool.com/quan-academy-2757/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23 Members • $15/month
Besser Saxophon spielen,Free,https://www.skool.com/saxophon/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,165 Members • Free
SING SING SING!,Free,https://www.skool.com/sing-it-out-6158/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,110 Members • Free
Languages through Music,Free,https://www.skool.com/languages-through-music-4515/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,179 Members • Free
Melodic Ai,$1/month,https://www.skool.com/melodic-ai-4395/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,50 Members • $1/month
SOYCORISTA,Free,https://www.skool.com/soycorista-2054/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20 Members • Free
Ultimate Jazz Drummer (LITE),Free,https://www.skool.com/ultimate-jazz-drummer-4617/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,514 Members • Free
The Steelpan Experience,$10/month,https://www.skool.com/the-steelpan-experience-1810/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • $10/month
SoundMind,$149,https://www.skool.com/soundmind/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,92 Members • $149
Soulful Guitar Collective,Free,https://www.skool.com/soulfulguitarcollective/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,745 Members • Free
The Inclusive Music Guild,Free,https://www.skool.com/the-inclusive-music-guild-7887/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,35 Members • Free
Harmony in Motion,$47/month,https://www.skool.com/harmony-in-motion/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,18 Members • $47/month
JamFast Guitar Insiders,$49/month,https://www.skool.com/jamfastguitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,249 Members • $49/month
LiveAct Academy,Free,https://www.skool.com/liveact-academy-1486/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12 Members • Free
藍波口琴線上平台,Free,https://www.skool.com/lambers-harmonica-3489/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,286 Members • Free
Diversifyd Music Community,Free,https://www.skool.com/diversifyd-music-ministry-6855/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,38 Members • Free
REMASTERMIND,Free,https://www.skool.com/salesremastered/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,371 Members • Free
Serious Singers,Free,https://www.skool.com/sing/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,37 Members • Free
The Sync Circle,Free,https://www.skool.com/the-sync-circle-1893/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,75 Members • Free
Helpful & Hopeful Piano,Free,https://www.skool.com/papagarymusic/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,18 Members • Free
Bienchanter - La Communauté Fr,Free,https://www.skool.com/bienchanter-lacommunaute/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,1.5k Members • Free
JAZZ PIANO ACADEMY 🎹,Free,https://www.skool.com/jazz-piano-masterclass/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
Mastering The Improvised Line,Free,https://www.skool.com/mastering-the-improvised-line-5858/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
Create Interesting Music.,Free,https://www.skool.com/cole-blouin-5221/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,32 Members • Free
Dreamgirl Producer Club,$5/month,https://www.skool.com/dreamgirl-producer-club-4799/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21 Members • $5/month
Creativity Lab,Free,https://www.skool.com/creativity-lab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,19 Members • Free
Creating Music And Sound,$25/month,https://www.skool.com/creatingmusicandsound/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,27 Members • $25/month
Saxophone Village,Free,https://www.skool.com/saxophonevillage/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,25 Members • Free
Simple Guitar,$1/month,https://www.skool.com/simple-guitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,64 Members • $1/month
Largo Corto,$188,https://www.skool.com/largo-corto-4810/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,24 Members • $188
Piano and Theory Essentials,Free,https://www.skool.com/pianolessons/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,72 Members • Free
The Fretboard Artist,Free,https://www.skool.com/hack-musica-6627/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,52 Members • Free
Low End Candy Collective,Free,https://www.skool.com/low-end-candy-collective-1686/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,55 Members • Free
The Sound Musician,$99/month,https://www.skool.com/thesoundmusician/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,25 Members • $99/month
The Fearless Performer Lab,Free,https://www.skool.com/the-fearless-performer-lab-6738/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • Free
Songwriting Accelerator,Free,https://www.skool.com/songwriting-accelerator-4633/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,31 Members • Free
La Via della Stella,Free,https://www.skool.com/laviadellastella/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,28 Members • Free
Lyric and Melody Unlocked,Free,https://www.skool.com/lyric-and-melody-unlocked-1941/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • Free
Klavier lernen: Play & Replay,Free,https://www.skool.com/lauras-play-and-replay/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13 Members • Free
Piano by Abel,Free,https://www.skool.com/piano-by-abel-5007/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,173 Members • Free
Pinnacle Jazz Guitar Studio,Free,https://www.skool.com/pinnacle-jazz-guitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26 Members • Free
JazzMind Studio,Free,https://www.skool.com/jazzmind-studio/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,108 Members • Free
FLuency,$38/month,https://www.skool.com/fl-studio-fluency-9018/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • $38/month
Acordes Melodicos,$35,https://www.skool.com/guitarra-melodica-1023/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,105 Members • $35
FanbasePRO: Music Marketing,Free,https://www.skool.com/fanbasepro-music-marketing-7244/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,360 Members • Free
No Engineer Needed,Free,https://www.skool.com/2-points-sound-2332/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,433 Members • Free
Sexy AF Backing Tracks,Free,https://www.skool.com/sexyafbackingtracks/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,916 Members • Free
Release Music Academy,$15/month,https://www.skool.com/release-music-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • $15/month
Piano Games,Free,https://www.skool.com/piano-lite-3590/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,144 Members • Free
Modern Drumming for Beginners,$19/month,https://www.skool.com/modern-drumming-for-beginners-5430/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • $19/month
Making Records Alone,Free,https://www.skool.com/rock-records-with-your-gear-5792/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,36 Members • Free
Audio Artist Rise,$97/month,https://www.skool.com/audio-artist-rise/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,102 Members • $97/month
Trombone Lab,Free,https://www.skool.com/trombone-lab-1585/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,154 Members • Free
AM Vocal Academy Lite,Free,https://www.skool.com/am-vocal-academy-lite-4844/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,94 Members • Free
Max’ Guitar Academy,Free,https://www.skool.com/guitar-academy-2485/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23 Members • Free
TAB Academy,Free,https://www.skool.com/tab-academy-5778/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,129 Members • Free
The Modern Musician's Edge,Free,https://www.skool.com/sonoctave-9169/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,42 Members • Free
Trumpet Mastery Tier 1,$49/month,https://www.skool.com/trumpet-mastery-tier-1-4051/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,25 Members • $49/month
Bassists Helping Bassists!,Free,https://www.skool.com/bass-freedom-9079/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,226 Members • Free
VOCES - Ana Ruth Aquino,$25/month,https://www.skool.com/voces-ana-ruth-aquino-7279/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • $25/month
Piano For Producers,Free,https://www.skool.com/piano-for-producers-4653/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,32 Members • Free
Piano made simple with Gma,Free,https://www.skool.com/piano-made-simple-with-gma-1390/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,48 Members • Free
Systems for Creation,$444/month,https://www.skool.com/systemsforcreation/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,69 Members • $444/month
Kingdom Bass,Free,https://www.skool.com/church-bass-players-4010/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,252 Members • Free
Drum Dojo,$29/month,https://www.skool.com/samurai-drummer-academy-9027/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,49 Members • $29/month
Guitar as Medicine,Free,https://www.skool.com/guitar-as-medicine-9631/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26 Members • Free
sanctuary sound lounge.,$10/month,https://www.skool.com/jazzsoul-music-production-6726/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,27 Members • $10/month
Wedding DJ Mastery,Free,https://www.skool.com/wdjmastery/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,256 Members • Free
Piano con Laura,Free,https://www.skool.com/cursodepiano-7656/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,118 Members • Free
The ABC's of Jazz Guitar,Free,https://www.skool.com/jazzguitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,57 Members • Free
Hackers de Hits Virales,$9/month,https://www.skool.com/hackers-de-hits-virales-9688/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • $9/month
MoaM - Coaching,Free,https://www.skool.com/musician-on-a-mission-7903/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,498 Members • Free
The Gig Warriors,Free,https://www.skool.com/making-money-making-music/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
Saxophon Campus Jazz,Free,https://www.skool.com/saxophon-campus-jazz/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,22 Members • Free
Vocal Production MASTERCLASS,Free,https://www.skool.com/vocal-production-masterclass-4131/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • Free
It's a String Thing,Free,https://www.skool.com/its-a-string-thing-7781/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20 Members • Free
The Skool Music Syndicate,$69/year,https://www.skool.com/the-skool-music-syndicate-6071/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • $69/year
Fanbase Factory,$7/month,https://www.skool.com/underground-ultimate-5789/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,109 Members • $7/month
Music Artist Revival,Free,https://www.skool.com/mixed-music-arts-5552/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • Free
The Dynamic Voice Program,Free,https://www.skool.com/thedynamicvoice/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,44 Members • Free
Jazz Singer Harvey Thompson,Free,https://www.skool.com/jazz-singer-harvey-thompson-9537/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
Music Production Mentorship,Free,https://www.skool.com/rainbowrootrecords-5918/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,49 Members • Free
The Green Room,$59/month,https://www.skool.com/thegreenroomproduction/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,25 Members • $59/month
Band Room,Free,https://www.skool.com/written-music-accountability-5710/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,22 Members • Free
Unreasonable Artist Community,Free,https://www.skool.com/magneticartist/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,50 Members • Free
Bootleg Recording,Free,https://www.skool.com/bootlegrecording/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,14 Members • Free
Fundamental Harmonic Motion,$50/month,https://www.skool.com/fhm/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • $50/month
909 Tribe,$29/month,https://www.skool.com/909-tribe-4453/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20 Members • $29/month
Metodo Arcoiris,Free,https://www.skool.com/metodo-arcoiris-2664/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,56 Members • Free
The Game Audio Company Academy,Free,https://www.skool.com/the-game-audio-company-academy-4378/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20 Members • Free
The Future Icons Academy,Free,https://www.skool.com/the-future-icons-academy-4735/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,248 Members • Free
Handpan Song Method by Louis L,$29/month,https://www.skool.com/handpansongmethod/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,33 Members • $29/month
Stringlingo Cello Academy,Free,https://www.skool.com/stringlingo-academy-2090/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,74 Members • Free
The Gospel Blueprint,Free,https://www.skool.com/gospel-blueprint/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,154 Members • Free
Gabe Toth Music Studio,Free,https://www.skool.com/gabe-toth-music-coaching-fun-9721/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • Free
Foundation Music,Free,https://www.skool.com/step-one-3093/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,86 Members • Free
Guitar Song Mastery,Free,https://www.skool.com/guitarsongmastery/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,123 Members • Free
Bedroom-Performing Guitarists,Free,https://www.skool.com/bedroom-performing-guitarists-5580/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
David's Harp Community,Free,https://www.skool.com/davidsharp/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,50 Members • Free
Guitar Setups and Repairs,Free,https://www.skool.com/guitar-setups-and-repairs-1404/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • Free
The Order of Strings,Free,https://www.skool.com/guitar-coaching-2674/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,106 Members • Free
Handpan Akademie,Free,https://www.skool.com/handpan-akademie/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,198 Members • Free
Meloetry — Songwriting Lab,Free,https://www.skool.com/quiet-moth-artz-3686/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • Free
Vyper Guitar Academy,Free,https://www.skool.com/vyper-guitar-academy-6634/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,112 Members • Free
Music Mentors Hub,"$1,997/year",https://www.skool.com/freedom-creators-mastermind-4208/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"4 Members • $1,997/year"
Piano with Ease Mini,$8/month,https://www.skool.com/piano-with-ease-1657/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,15 Members • $8/month
KPOP AUDITION PASSED GUIDE,Free,https://www.skool.com/kpop-audition-passed-guide-9228/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • Free
The Muzik Collective,$16/month,https://www.skool.com/the-muzik-collective-7341/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • $16/month
Shaun VI,$97,https://www.skool.com/shaun-vi/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,119 Members • $97
Bingil Academy,Free,https://www.skool.com/bingil-academy-9209/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,60 Members • Free
Find a Way to SING!,$97/month,https://www.skool.com/find-a-way-to-sing/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,113 Members • $97/month
ZONE : The Studio,Free,https://www.skool.com/guitar-zero-to-hero-3065/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,456 Members • Free
Giant Steps Piano Group,Free,https://www.skool.com/giant-steps-piano-group-1993/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,361 Members • Free
Directing The Line,$62/month,https://www.skool.com/directing-the-line/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • $62/month
Journey to Gigs Academy,Free,https://www.skool.com/jtg-academy-3867/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • Free
Beyond Perfect Pitch,Free,https://www.skool.com/beyond-perfect-pitch-6924/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,107 Members • Free
Demo To Drop Academy,Free,https://www.skool.com/demo-to-drop-academy-3325/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
Billy Paul’s Guitar Academy,Free,https://www.skool.com/billy-pauls-guitar-academy-4254/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
The NRG Academy,$47/month,https://www.skool.com/the-nrg-academy-2169/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,35 Members • $47/month
Windjack Studios Guitar Lab,Free,https://www.skool.com/the-daily-jam-4914/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,25 Members • Free
Jazz Line Lab - Ann Vancoillie,Free,https://www.skool.com/jazz-line-lab-ann-vancoillie-8234/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23 Members • Free
String-ology,Free,https://www.skool.com/guitar-hangout-8694/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • Free
AMR Music Education,Free,https://www.skool.com/amr-music-education-7143/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21 Members • Free
The Voice Studio,$27/month,https://www.skool.com/singerslaunchpad/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • $27/month
Living Piano Mastermind Club,Free,https://www.skool.com/living-piano-mastermind-club-7076/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • Free
Skool Studios,Free,https://www.skool.com/skool-music-4317/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,53 Members • Free
Recorder Central,Free,https://www.skool.com/recordercentral/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,67 Members • Free
Producer Union,Free,https://www.skool.com/producerunion/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
The Vocal Forge,$147/month,https://www.skool.com/the-vocal-forge-6481/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • $147/month
The Long Game,$39/month,https://www.skool.com/the-long-game-2265/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,14 Members • $39/month
Performance Accelerator,Free,https://www.skool.com/david-barney-music-skool-7966/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • Free
THE INDIE ALL STAR SONGWRITER,Free,https://www.skool.com/the-indie-all-star-songwriter-8730/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,63 Members • Free
Artist Accelerator Academy,Free,https://www.skool.com/artist-accelerator-academy-1487/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,31 Members • Free
Accordion Time,Free,https://www.skool.com/accordiontime/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,58 Members • Free
Guitar Unlocked Method,Free,https://www.skool.com/guitar-unlocked-method/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,15 Members • Free
SIMPLIFYING CHORDS AND MORE.,$11/month,https://www.skool.com/simplifying-chords-and-more-6317/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • $11/month
Master Jazz & Brass,Free,https://www.skool.com/dannykirkhum/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,205 Members • Free
Singing Coach,$15/month,https://www.skool.com/singing-coach-4760/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • $15/month
Song Lab: Chris Belmont 🧪 🎧,Free,https://www.skool.com/the-bakery-music-group-4507/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,27 Members • Free
We Electronic,$55/month,https://www.skool.com/we-electronic/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,86 Members • $55/month
The Book of Life,Free,https://www.skool.com/bible-doctrine-goodly-music-9959/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
The Hip-Hop Formula,Free,https://www.skool.com/the-hip-hop-formula-9627/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
Cam Chords University,Free,https://www.skool.com/cam-chords-university-9480/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
ÖXL - BÖckstage Area,Free,https://www.skool.com/bockstagler-3034/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,19 Members • Free
Guitar Mastery Community,$49/month,https://www.skool.com/guitar-mastery/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,199 Members • $49/month
Jazz Piano Pro,Free,https://www.skool.com/jazz-piano-pro-4571/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,14 Members • Free
Vocal Impact,Free,https://www.skool.com/vocal-impact-9644/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
De DJ a Empresario,Free,https://www.skool.com/de-dj-a-empresario-4472/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,167 Members • Free
Adrian Ciuplea Music Academy,Free,https://www.skool.com/music-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,104 Members • Free
Bluegrass Guitar Dads,Free,https://www.skool.com/bluegrass-dads-6769/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,32 Members • Free
Tom Booth Voice and Friends,"$1,000",https://www.skool.com/tom-booth-voice-and-friends-6358/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"8 Members • $1,000"
Brynnersmusic Sax Academy🎷,Free,https://www.skool.com/brynnersmusic-sax-academy-5230/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,15 Members • Free
Hungarian Global Folk Network,Free,https://www.skool.com/magyar-5564/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,59 Members • Free
Ukulele Skool,Free,https://www.skool.com/ukulele-skool-3509/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,99 Members • Free
Cool Piano Teacher Community,Free,https://www.skool.com/jazz-piano-community/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,25 Members • Free
SongMuse,Free,https://www.skool.com/songmuse-7046/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21 Members • Free
RPG Maestro,Free,https://www.skool.com/rpg-maestro-4662/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,78 Members • Free
BedroomProducer.com,$5/month,https://www.skool.com/bedroomproducer/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20 Members • $5/month
Dominic Flynn Guitar (Premium),Free,https://www.skool.com/dominic-flynn-guitar-course-6370/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,228 Members • Free
The Weltsound Community,Free,https://www.skool.com/the-weltsound-mentorship-5925/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,219 Members • Free
Sing & Serve,Free,https://www.skool.com/singandserve/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • Free
Mario Silva Trumpet Students,Free,https://www.skool.com/mario-silva-trumpet-students-6409/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
Keys To The Heart,Free,https://www.skool.com/keystotheheart/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,24 Members • Free
Music Learning Theory (MLT),Free,https://www.skool.com/music-learning-theory-8870/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12 Members • Free
The Essential Musician,Free,https://www.skool.com/the-essential-musician-3255/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,44 Members • Free
The Complete Beat Club,Free,https://www.skool.com/way-higher-music-9949/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • Free
Blues Jam Ready,Free,https://www.skool.com/bensbluesguitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • Free
EDM Signature Program,Free,https://www.skool.com/productores-de-techno-5366/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,40 Members • Free
The Rock Group,Free,https://www.skool.com/the-rock-group-8527/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,49 Members • Free
Incubateur à DJ,Free,https://www.skool.com/demagli-5577/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,53 Members • Free
College Team,Free,https://www.skool.com/college-team-8436/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • Free
La Belle Note Music School,Free,https://www.skool.com/la-belle-note-music-school-8028/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,30 Members • Free
Musician's DIY Hub,Free,https://www.skool.com/musicians-diy-hub-2510/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,35 Members • Free
High End Sound for Music,Free,https://www.skool.com/high-end-sound-for-music-1026/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,44 Members • Free
🪄 🎹 AcademiadelMagoPianista,$22/month,https://www.skool.com/mago-pianista-en-21-dias-8280/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • $22/month
Producer Feedback Space,Free,https://www.skool.com/nicky-brenner-audio-tutorials-5349/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,65 Members • Free
Get To The Music Piano Club II,Free,https://www.skool.com/get-to-the-music-piano-club-ii-4494/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13 Members • Free
KI Song Social Club,Free,https://www.skool.com/ki-song-social-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
Bradley Weaver's Ukulele Club,Free,https://www.skool.com/speak-up-and-be-seen-3349/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21 Members • Free
Song Pros,$8/month,https://www.skool.com/the-song-pros-3388/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13 Members • $8/month
Oasis Sound Academy,Free,https://www.skool.com/ableton-masterclass-6765/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,59 Members • Free
Bateri Çal,Free,https://www.skool.com/bateri-calmay-ogren-1187/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,49 Members • Free
Creative Guitar Fundamentals,$89/month,https://www.skool.com/creative-guitar-fundamentals-2750/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,32 Members • $89/month
Drumline Playbooks,$27/year,https://www.skool.com/drumline/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23 Members • $27/year
The K-Pop Producer System,Free,https://www.skool.com/the-k-pop-producer-system-8122/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
Rybak's Piano Academy,$27,https://www.skool.com/rybaks-piano-academy-8037/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13 Members • $27
The Focused Cello,Free,https://www.skool.com/cello/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
Leon's Guitar & Creative Hub,$25/month,https://www.skool.com/leons-guitar-creative-hub-4632/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • $25/month
Piano Quest: Gradus Parnassum,Free,https://www.skool.com/gradus-ad-parnassum-5505/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13 Members • Free
Acoustic Guitar Circle,$9/month,https://www.skool.com/acoustic-guitar-circle-5492/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • $9/month
Piano Together - For Beginners,Free,https://www.skool.com/piano-together-for-beginners-5377/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,31 Members • Free
Soundcraft Academy,Free,https://www.skool.com/the-guitar-dojo-7168/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,63 Members • Free
4D Musician's Club,Free,https://www.skool.com/4d-musicians-club/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13 Members • Free
The Pen Power Lab,Free,https://www.skool.com/the-pen-power-lab-6786/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21 Members • Free
The Guitar Playground,Free,https://www.skool.com/the-guitar-playground-9197/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,27 Members • Free
Oscar Linde Piano | Community,$25/month,https://www.skool.com/oscar-linde-piano-community-9451/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,37 Members • $25/month
Confident Conducting,$27/month,https://www.skool.com/confident-conducting/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,25 Members • $27/month
Musician's Playbook,$27/month,https://www.skool.com/the-vcg-8486/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,55 Members • $27/month
Skool of Funk Guitar,$137,https://www.skool.com/samfirthguitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,55 Members • $137
E String Music Lounge,Free,https://www.skool.com/e-string-music-lounge-3665/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • Free
The Guitar Vault,$25/month,https://www.skool.com/the-guitar-vault-8100/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • $25/month
Snowman's Composition Lab,Free,https://www.skool.com/snowmans-composition-lab-5145/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,74 Members • Free
Headliner Academy Masterclass,"$4,999/year",https://www.skool.com/headlineracademymasterclass/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"8 Members • $4,999/year"
Fix My Credit - Credit Edu,Free,https://www.skool.com/qlef/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
Music Theory in the Fast Lane,Free,https://www.skool.com/music-theory-in-the-fast-lane-8010/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13 Members • Free
The Guitar Accelerator Program,Free,https://www.skool.com/guitar-accelerator-program-2825/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,65 Members • Free
Happy Keys Piano School,Free,https://www.skool.com/happy-keys-piano-school-1595/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
Resonant Frequency Club,Free,https://www.skool.com/resonant-frequency-club-1323/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
Music Earners,Free,https://www.skool.com/music-earners-3158/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,35 Members • Free
Kampvuur Musiek,Free,https://www.skool.com/nexogen-community-7718/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,115 Members • Free
We Will Rock 🤘You! 🏴‍☠️,Free,https://www.skool.com/unbound-craft-3604/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
The Drum Note,$49/month,https://www.skool.com/the-drum-note-2316/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • $49/month
Carlos Fischer - FMA,$96/month,https://www.skool.com/fischer-music-academy-2549/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,75 Members • $96/month
Performer's Pathway (VIP),$47/month,https://www.skool.com/keys/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • $47/month
All In Guitar Mentorship,Free,https://www.skool.com/all-in-8973/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,89 Members • Free
Dynamic Drum Academy,$39/month,https://www.skool.com/dynamic-drum-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,15 Members • $39/month
The Listening Room,Free,https://www.skool.com/the-listening-room-1026/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
LiederLabor,Free,https://www.skool.com/coretuneslab-8986/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,15 Members • Free
Productores Cuánticos Urbanos,$30/month,https://www.skool.com/productores-cuanticos-urbanos-9961/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • $30/month
Smart Singer Society,$29/month,https://www.skool.com/smart-singer-society-8969/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,140 Members • $29/month
Perform confident. Learn after,Free,https://www.skool.com/the-confident-performer-1937/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
Holy Flow Music Lab,Free,https://www.skool.com/instrumental-ministry-2069/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • Free
Middle School Music Teachers,Free,https://www.skool.com/middle-school-music-teachers-3563/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • Free
GarageBand production,Free,https://www.skool.com/garageband-production-6741/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
Roxy Music Guitar Course,Free,https://www.skool.com/roxy-music-lessons-8055/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,59 Members • Free
Saxophone Café,Free,https://www.skool.com/saxophone-cafe-3503/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,71 Members • Free
YouChords,Free,https://www.skool.com/harmonium-evolution-india-2367/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,180 Members • Free
Music Freedom,$9/month,https://www.skool.com/wodonga-academy-of-music-7928/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,43 Members • $9/month
Master YouTube,Free,https://www.skool.com/master-youtube-for-musicians-2031/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10 Members • Free
Limber Music | TAB'S | GUITAR,Free,https://www.skool.com/limber-music-guitarra-5989/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
Piano fácil para adultos,$20/month,https://www.skool.com/piano-facil-para-adultos-2547/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • $20/month
Buskers Hub,Free,https://www.skool.com/unlock-my-classical-voice-4565/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12 Members • Free
Chitarra Semplice,Free,https://www.skool.com/chitarra-semplice-8622/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,28 Members • Free
Classical Saxophone Studio,Free,https://www.skool.com/classical-saxophone-studio-7827/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,19 Members • Free
Mentoría Élite Solo Formula,Free,https://www.skool.com/mentoria-elite-solo-formula-7800/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,80 Members • Free
Music Mastermind Collective,$49/month,https://www.skool.com/music-mastermind-collective-2983/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20 Members • $49/month
Lessons123 VIP,$97/month,https://www.skool.com/lessons123vip/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,33 Members • $97/month
The Weekly WAV,Free,https://www.skool.com/wav/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,45 Members • Free
Gitarrenpark. Akkord Upgrade,Free,https://www.skool.com/gitarrenpark-gitarre-lernen-9793/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
Recording Arts (Mix-Mastering),Free,https://www.skool.com/recordingarts/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • Free
TeleTime with Randall George,Free,https://www.skool.com/teletime-with-randall-george-8620/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26 Members • Free
Poverty music productions,Free,https://www.skool.com/poverty-music-productions-8104/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,32 Members • Free
STATION MUSIC HUB,Free,https://www.skool.com/station-music-hub-9391/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
Jon's Guitar Lounge,Free,https://www.skool.com/jonsguitarlounge/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,28 Members • Free
La batterie avec Jérôme,$29/month,https://www.skool.com/jerdrum-academie-5445/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,25 Members • $29/month
ecpiano.fun,Free,https://www.skool.com/ecpiano-1707/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,169 Members • Free
Kingdom Musicians,Free,https://www.skool.com/kingdom-musicians-collective-6116/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,18 Members • Free
OPERATOR MODE with Uncle A.I.,$49/month,https://www.skool.com/operatormode/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • $49/month
SOUNDLAB,$20/month,https://www.skool.com/soundlab-2002/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,74 Members • $20/month
Tonic Note Records,Free,https://www.skool.com/tonic-note-records-9947/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
Beyond Vocals,Free,https://www.skool.com/beyond-vocals-/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,81 Members • Free
Drumming & Clave Community,Free,https://www.skool.com/clave-drum-system-2391/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13 Members • Free
LTrain Jazz Studios,Free,https://www.skool.com/ltrainjazzstudios/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
Reason for Drum&Bass producers,Free,https://www.skool.com/reason-for-drumbass-producers-3401/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
REVOLTE | Curso Essentials 2.0,$197,https://www.skool.com/revolte-2571/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,79 Members • $197
Andre Hayward Lessons,$27/month,https://www.skool.com/andre-hayward-lessons-5442/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12 Members • $27/month
Wilma Beers Community,Free,https://www.skool.com/wilmabeers/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,296 Members • Free
Growing Guitar,Free,https://www.skool.com/growing-guitar-8848/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,18 Members • Free
Music Skool (Free),Free,https://www.skool.com/music-skool-6731/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,45 Members • Free
Lesson Progression 🏛️ Agora,Free,https://www.skool.com/lesson-progression-8561/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21 Members • Free
Pianoflow -spiele frei Klavier,Free,https://www.skool.com/pianoflow-7097/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23 Members • Free
Breakthrough Keys Academy,Free,https://www.skool.com/keyboard-mastery-7038/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • Free
The Pickers Collective,Free,https://www.skool.com/wills-community-1761/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
Musik als Muttersprache,Free,https://www.skool.com/musik-als-muttersprache-2002/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
Music Monetization Mastery,$59/month,https://www.skool.com/music-monetization-mastery-2446/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • $59/month
DAW & Practical Music Theory,Free,https://www.skool.com/daw-practical-music-theory-3650/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10 Members • Free
Gabriel Gordon Music Secrets,$55/month,https://www.skool.com/gabriel-gordon-music-secrets/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • $55/month
Geeky Keys,Free,https://www.skool.com/geeky-keys-6035/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12 Members • Free
Conception et Fabrication,Free,https://www.skool.com/make-your-own-sound-5187/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • Free
Tuba Tone Club,$9/month,https://www.skool.com/tmo-portal-3017/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • $9/month
Chill Producers Academy,$97/month,https://www.skool.com/chill-producers-academy-9281/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • $97/month
Sick Tom Toms Music,Free,https://www.skool.com/sicktomtoms/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,216 Members • Free
Jazz Talk FREE SKOOL COMMUNITY,Free,https://www.skool.com/jazz-talk-free-4343/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,78 Members • Free
The Music Mastery Hub,$79/month,https://www.skool.com/themusicmasteryhub/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13 Members • $79/month
1ElevenAudio Producer Academy,Free,https://www.skool.com/1elevenaudio-producer-academy-1930/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,66 Members • Free
Enabled Music™,Free,https://www.skool.com/enabled-music-5451/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • Free
Harmonie Lounge,Free,https://www.skool.com/harmonie-lounge-9713/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12 Members • Free
Angies Vocals,$27/month,https://www.skool.com/angies-vocals/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,34 Members • $27/month
FilmMusicComposer,Free,https://www.skool.com/filmmusiccomposer-3161/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,46 Members • Free
The Wizard’s Guild,$57/month,https://www.skool.com/the-wizards-guild-4392/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • $57/month
Klavieratelier,Free,https://www.skool.com/klavieratelier-4321/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • Free
Dilly Producer Program,$397/month,https://www.skool.com/dilly-producer-program-8160/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • $397/month
Music Feedback Lab,$97/month,https://www.skool.com/musicfeedbacklab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,113 Members • $97/month
Electric Worship Essentials,$97,https://www.skool.com/electric-worship-essentials-8853/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • $97
Soros Guitar Mentorship,$22/month,https://www.skool.com/soros-guitar-mentorship-7596/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • $22/month
Rock ‘n’ Roll Recovery,Free,https://www.skool.com/rock-n-roll-recovery-8184/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • Free
Spotswood Music,Free,https://www.skool.com/spotswood-music-8690/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
Inner Circle Producers,Free,https://www.skool.com/musicbychi-2783/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,109 Members • Free
Sax Teacher Community,Free,https://www.skool.com/saxteachercommunity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • Free
Nova Club | Comunidad para DJs,Free,https://www.skool.com/nova-club-5803/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,15 Members • Free
Song Architect,Free,https://www.skool.com/song-architect-6314/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,30 Members • Free
Drum Skool,Free,https://www.skool.com/drum-skool-5603/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,45 Members • Free
Singingforlife,Free,https://www.skool.com/singingforlife-8666/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,129 Members • Free
Lumiro - Lehrer Community 💛,Free,https://www.skool.com/lumiro-lehrer-20-3158/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23 Members • Free
BandForge Pro,Free,https://www.skool.com/bandforge-9267/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,37 Members • Free
Music Production Workshop,Free,https://www.skool.com/jadens-group-3243/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • Free
FutureSelf Guitar Lessons,$100/month,https://www.skool.com/futureself-guitar-lessons-3838/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • $100/month
Seba Guitar,Free,https://www.skool.com/seba-guitar-1969/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
Shred University,$50/month,https://www.skool.com/shred-university/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • $50/month
Hybrid Piano Lessons,$99/month,https://www.skool.com/hybrid-piano-lessons-7307/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • $99/month
FINGERSTYLE GUITAR SKOOL,$9/month,https://www.skool.com/fingerstyleguitarskool/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10 Members • $9/month
Fresh Start Fiddlers,Free,https://www.skool.com/fresh-start-fiddlers-4844/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21 Members • Free
Fullerton Guitar fellowship,$7/month,https://www.skool.com/fullertone-guitar-fellowship-4297/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,15 Members • $7/month
The Singers Room,Free,https://www.skool.com/amanda-mac-voice-community-3764/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,38 Members • Free
The Dj Institute,Free,https://www.skool.com/the-dj-institute-2629/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
Masters MCA,$47,https://www.skool.com/masters-mca/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • $47
SDJ101,Free,https://www.skool.com/sdj101-2381/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10 Members • Free
USJR. Audio Academy,$29/month,https://www.skool.com/usjr-productions-5786/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $29/month
Music Technology Hub,Free,https://www.skool.com/musician-techs-5238/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,108 Members • Free
Bloom Studio,Free,https://www.skool.com/poppies-quartet-1992/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
Jazz Hands Studio,Free,https://www.skool.com/jazzhandsstudio/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,42 Members • Free
Colorful 🌈 🎹 🎶,Free,https://www.skool.com/bens-group-7083/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
musicwithjamess,$30/month,https://www.skool.com/musicwithjamess/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • $30/month
Producer Launchpad,Free,https://www.skool.com/producerlaunchpad/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26 Members • Free
The SaxTips Club,$10/month,https://www.skool.com/saxtips-club-3966/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • $10/month
Video Game Music School,$49/month,https://www.skool.com/videogamemusic/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • $49/month
Music Skool,Free,https://www.skool.com/songwriting-with-purpose-3678/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
Beverly Rivers Voice Studio,Free,https://www.skool.com/tuneyourvoice-2259/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12 Members • Free
Somatic Drummer,Free,https://www.skool.com/somaticdrummer/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,81 Members • Free
The Mini Music Mentorship,$99/month,https://www.skool.com/chordacademy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,35 Members • $99/month
Gitaar Academie NL,Free,https://www.skool.com/kevins-gitaarles-1874/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
Songwriters Circle Room,$7/month,https://www.skool.com/songwriters-circle-9181/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10 Members • $7/month
Freude am Singen!,Free,https://www.skool.com/sangerinnen-und-sanger-5237/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,25 Members • Free
Lowland Recordings,Free,https://www.skool.com/lowland-recordings-5841/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26 Members • Free
Singing: The MAGIC Method,$149,https://www.skool.com/singingmagic/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,40 Members • $149
Musiclingo,$25/month,https://www.skool.com/lsa-2924/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • $25/month
Exalt-Nation,$47/month,https://www.skool.com/exalt-nation-1930/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10 Members • $47/month
CLGA LABS,$25/month,https://www.skool.com/clga-labs-1628/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $25/month
Songwriting & Home-Recording,Free,https://www.skool.com/songwriting-home-recording-9130/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • Free
Fertile Minds Jazz Acacemy,$20,https://www.skool.com/fertile-minds-jazz-acacemt-7717/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • $20
Piano Pages,$7,https://www.skool.com/piano-pages-1204/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • $7
Flamenco4U™ Guitar Skool,$39/month,https://www.skool.com/flamenco4u-guitar-skool-5889/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • $39/month
The Piano Improvement Club,$20/month,https://www.skool.com/the-piano-improvement-club-8320/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • $20/month
Jack's Piano Community,$49/month,https://www.skool.com/jack/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • $49/month
電鼓人 Grooving Room,Free,https://www.skool.com/grooving-room-6598/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • Free
Caleb Wilson Bass Academy,$34/month,https://www.skool.com/grade-8-bass-academy-4929/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • $34/month
THE SYNC SAVANT,Free,https://www.skool.com/the-sync-sevamt-9035/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,58 Members • Free
The Artist Development Academy,"$6,800",https://www.skool.com/mts-music-house-5036/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,"9 Members • $6,800"
The Cello Playground,$39/month,https://www.skool.com/cosmicgirlie-9212/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10 Members • $39/month
Club Music Production 🔊 Free,Free,https://www.skool.com/school-of-tuna-5587/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,100 Members • Free
Biscuit Head,Free,https://www.skool.com/biscuithead/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,78 Members • Free
Animara Handpan Global,Free,https://www.skool.com/animara-handpan-europa-6612/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • Free
Guitar Dojo,Free,https://www.skool.com/guitar-dojo-4304/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,14 Members • Free
30 - Day Songwriters,Free,https://www.skool.com/30-day-songwriters-8689/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12 Members • Free
Music Production Made Easy,$100/month,https://www.skool.com/smarter-proficient-artists-9764/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • $100/month
UAL II - Guitar Freedom,Free,https://www.skool.com/ual-ii-guitar-freedom-6033/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13 Members • Free
Clases de Guitarra Técnica,$20/month,https://www.skool.com/clases-de-guitarra-tecnica/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • $20/month
MUSICOS EN COMUNIDAD,$39/month,https://www.skool.com/musicos-del-mundo-5388/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,18 Members • $39/month
Alchemy Producer Collective,Free,https://www.skool.com/cinematicelectronic-music-pro-8099/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,45 Members • Free
JAMSTAY Online,$29/month,https://www.skool.com/jamstayonline/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • $29/month
Piano For Adult Beginners,$50/month,https://www.skool.com/piano-for-adult-beginners-8432/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $50/month
Home Recording 101,Free,https://www.skool.com/home-recording-101-8222/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • Free
KC Guitar Academy,Free,https://www.skool.com/kc-guitar-academy-3340/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • Free
The Catalog Club,Free,https://www.skool.com/business-with-beats-9393/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • Free
OneLifeMusicandPodcastAcademy,Free,https://www.skool.com/onelifemusicandpodcastacademy-3462/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • Free
Bombs Away - Music Production,Free,https://www.skool.com/music-production-bombs-away-5204/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
The Clarinet Tone Lab,$39/month,https://www.skool.com/the-clarinet-tone-lab/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $39/month
Full-Time Music Production,Free,https://www.skool.com/logic-pro-mastery-5950/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,22 Members • Free
Lobpreis-Community,Free,https://www.skool.com/lobpreis-community-6376/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,35 Members • Free
Piano Dojo,Free,https://www.skool.com/piano-dojo-9864/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12 Members • Free
YPK Music Group,$75/month,https://www.skool.com/ypkgroup/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • $75/month
Marching University,$15/month,https://www.skool.com/marchinguniversity/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,74 Members • $15/month
Get Songs Done | The Finishers,$5/month,https://www.skool.com/get-songs-done-finishers-2469/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $5/month
Do Live Audio™,$250/year,https://www.skool.com/doliveaudio/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • $250/year
The Gentleman's Board,$47/month,https://www.skool.com/the-gentlemans-board/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • $47/month
The Didgeridoo Method,Free,https://www.skool.com/the-didgeridoo-method-2913/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • Free
Guitarra social,Free,https://www.skool.com/guitarrasocial/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
Vade Vocal Family,$19/month,https://www.skool.com/vade-vocal-family-1736/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • $19/month
Richards Music Lessons,Free,https://www.skool.com/guitar-made-easy-5367/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
The Academy by Musical Dept,Free,https://www.skool.com/musical-dept-academy-3978/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
Praise House Guests,Free,https://www.skool.com/praise-house-1474/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
Worship Piano Resources,Free,https://www.skool.com/andy-young-music-academy-4374/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,23 Members • Free
Mr. Wagner's Classroom,$19/month,https://www.skool.com/mr-wagners-classroom-5585/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • $19/month
Hudební Teorie,$24/month,https://www.skool.com/hudebni-teorie-1789/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • $24/month
The Praise Academy,Free,https://www.skool.com/30-day-worship-guitar-5326/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,42 Members • Free
Six Strings Academy,Free,https://www.skool.com/six-strings-academy-5837/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • Free
Unholy Keys,$4/month,https://www.skool.com/unholy-keys-7842/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $4/month
Jacobs Vocal Academy,$7/month,https://www.skool.com/jacobs-vocal-academy-6989/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • $7/month
Play By Ear - Piano Lessons,$5/month,https://www.skool.com/play-by-ear-2089/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • $5/month
The Rewrite Lab,$39/month,https://www.skool.com/writing-composition-critique-2722/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • $39/month
Happy Music Teacher GA,$5/month,https://www.skool.com/happy-music-teacher-ga-1492/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • $5/month
The Upstate Sound Academy,Free,https://www.skool.com/the-upstate-sound-music-group-8781/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
sixStringTheory,Free,https://www.skool.com/sixstringtheory-9314/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • Free
PRODHEDA Music Lab,Free,https://www.skool.com/prodheda-music-lab-3102/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21 Members • Free
APRENDER A TOCAR BACHATA,$27/month,https://www.skool.com/aprender-a-tocar-bachata-5301/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • $27/month
De Zéro à Pianiste,Free,https://www.skool.com/de-zero-a-pianiste-8438/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,16 Members • Free
Jack of All Staves Music,Free,https://www.skool.com/jack-of-all-staves-music-5909/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,14 Members • Free
FELLOWSHIP+ | Bass Guitar,Free,https://www.skool.com/the-fellowship-bass-guitar-6255/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,19 Members • Free
The Music Academy,$299/month,https://www.skool.com/the-music-academy-7449/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,117 Members • $299/month
PopRockers Club,Free,https://www.skool.com/poprockers-club-1674/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
Bernie's Klarinettenwerkstatt,$29/month,https://www.skool.com/bernies-klarinettenwerkstatt-9062/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $29/month
João Capinha's Music Academy,$60/month,https://www.skool.com/joao-capinhas-music-academy-3678/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $60/month
Afghan Rubab,Free,https://www.skool.com/afghan-rubab-1505/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
Skool of Sax,Free,https://www.skool.com/sax-of-liberation-lifeofkye/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • Free
Learn Guitar Fundamentals,$125/month,https://www.skool.com/next-gen-guitar-micro-tech-7616/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $125/month
Banjo for Popular Music 👷‍♂️,$99/month,https://www.skool.com/banjo-for-popular-music-5427/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • $99/month
Música Medicina/Medicine Music,Free,https://www.skool.com/medicine-musicmusica-medicina-5251/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,30 Members • Free
The Funked Dimension,Free,https://www.skool.com/the-funked-dimension-6045/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,12 Members • Free
MUSIC MAKERS MAFIA,Free,https://www.skool.com/music-mak3r-mafia-3775/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
TOCARDEOIDO UNIVERSITY,Free,https://www.skool.com/merengue-university-7079/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • Free
Extreme Midi Academy,$1/month,https://www.skool.com/extreme-midi-academy-5346/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26 Members • $1/month
EntrePROducteur,Free,https://www.skool.com/entreproducteur-4552/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,41 Members • Free
Circle of Rock with Kristian,Free,https://www.skool.com/circle-of-rock-guitarn-music-7104/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13 Members • Free
Mr. Jackson’s Music Skool,Free,https://www.skool.com/mr-jacksons-music-voice-2217/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • Free
音婆｜中東手鼓工作坊 Impro Musik,Free,https://www.skool.com/impro-music-2146/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,52 Members • Free
Arlette's Performance Class,$99/month,https://www.skool.com/arlette-beauchamps-group-class-9926/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $99/month
ChristianProducerBreakthrough,Free,https://www.skool.com/dj-and-talia-5809/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,22 Members • Free
Klavirska ustvarjalnica,Free,https://www.skool.com/klavirska-ustvarjalnica-4811/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,24 Members • Free
Etienne Baudiment Drums,Free,https://www.skool.com/etienne-baudiment-drums-5391/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
🌶 Kurry Klub Music Skool,$10/month,https://www.skool.com/kurry-klub-7389/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • $10/month
Saxophon Star-ters,Free,https://www.skool.com/saxophon-stars-5742/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10 Members • Free
Jess Liang Piano,Free,https://www.skool.com/jess-liang-piano-4624/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
Grow Your Network Impactfully,Free,https://www.skool.com/music-makers-biz-colb-network-7589/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • Free
Mammoth Music Lessons,Free,https://www.skool.com/music-lessons-albany-6138/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,20 Members • Free
Chordia,$150/month,https://www.skool.com/yuhsuan-3712/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10 Members • $150/month
Metro's Music Academy,Free,https://www.skool.com/whoisthemetro/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,21 Members • Free
DMT Garden,Free,https://www.skool.com/dmt-8226/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • Free
Masteringuitar,$30/month,https://www.skool.com/masteringuitar-5011/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,17 Members • $30/month
Electric Instrumental Soloist,Free,https://www.skool.com/electric-instrumental-soloist-9859/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
Hidden Architecture of Music,$199/month,https://www.skool.com/hidden-architecture-of-music-5527/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • $199/month
Get better at guitar,Free,https://www.skool.com/guitar-musicianship-8126/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
Anthem School Of Music,Free,https://www.skool.com/anthem-music-school-2451/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
The Play Again Piano Studio,$49,https://www.skool.com/the-play-again-piano-studio-3229/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • $49
Sing With Your Children,Free,https://www.skool.com/hereticheartearth-based-magic-6718/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
The Art of Music Making,$65/month,https://www.skool.com/the-art-of-music-making-8060/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • $65/month
Musica Practika,$11/month,https://www.skool.com/musicapractika-7267/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • $11/month
YOUR DESTINY ACADEMY🎙️,Free,https://www.skool.com/meet-your-destiny-5273/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
Gig City Music Group,Free,https://www.skool.com/matt-kelly-8991/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • Free
RA Method of Lyrical Mastery,$30/month,https://www.skool.com/ra-method-of-lyrical-mastery-5984/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $30/month
和小蔚學彈唱,Free,https://www.skool.com/brewster-academy-7682/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,22 Members • Free
Funkadelic Studios,$5/month,https://www.skool.com/funkadelic-studios-2541/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • $5/month
Joni's Guitar Academy,$80/month,https://www.skool.com/jonis-guitar-academy-7399/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • $80/month
Acordes de Esperanza,$19/month,https://www.skool.com/acordes-de-esperanza-2714/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,6 Members • $19/month
Bassmayn,Free,https://www.skool.com/the-inaugural-bassis-4570/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,36 Members • Free
Trigger Keys Academy,$20/month,https://www.skool.com/trigger-keys-academy/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • $20/month
Music Educators Online,Free,https://www.skool.com/educatorsonline-5103/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,78 Members • Free
Bjorn’s artist,$20/month,https://www.skool.com/bjorns-artist-8057/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $20/month
Playful Piano for Grownups,$25/month,https://www.skool.com/teena-talks-5894/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • $25/month
Stand Up Stand Out,$59,https://www.skool.com/stand-up-stand-out-1985/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $59
Mr Wise MGMT,Free,https://www.skool.com/mr-wise-mgmt-9729/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
Exposure Producer Community,Free,https://www.skool.com/exposure-producer-community-1036/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
Next Level Guitarist,$11/month,https://www.skool.com/next-level-guitarist-7845/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • $11/month
Bob Mover JazzAbility,$8/month,https://www.skool.com/bob-mover-jazzability-9444/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • $8/month
Guitarra Fusion en Español,$23/month,https://www.skool.com/guitarra-fusion-en-espanol-4835/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $23/month
Čonce spletna učilnica,Free,https://www.skool.com/conce-kitaristi-4879/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,26 Members • Free
Acting with JAM,$30/month,https://www.skool.com/acting-withjam-7854/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • $30/month
Brit's Club,$25/month,https://www.skool.com/brits-club-7433/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $25/month
Music Tourism by BSR Travel,Free,https://www.skool.com/bsr-travel-insiders-2470/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
Sonicshark Music Composers,Free,https://www.skool.com/sonicshark-music-composers-7176/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
Zol-made that Guitar Journey,$35/month,https://www.skool.com/zol-made-that-5643/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • $35/month
Label Yourself Music Business,Free,https://www.skool.com/label-yourself-music-business-6899/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
the jngl gym,Free,https://www.skool.com/the-jngl-gym-6726/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • Free
Amajammer,Free,https://www.skool.com/amajammer-7243/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10 Members • Free
GoodTalk Community College VIP,Free,https://www.skool.com/goodtalk-community-college-vip-8288/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
Melodic Pulse Collective,$149/month,https://www.skool.com/melodic-pulse-collective-1491/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,13 Members • $149/month
Musicpreneurs,Free,https://www.skool.com/the-musicpreneur-blueprint-3275/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
Charlie Bassen,$80/month,https://www.skool.com/charlie-bassen-9345/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $80/month
Sonalira,Free,https://www.skool.com/resonira-1834/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • Free
Global Music Contracts,Free,https://www.skool.com/saxophone-online-3277/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • Free
Club de versos,Free,https://www.skool.com/club-de-versos-5975/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • Free
Škola zvuku,$19/month,https://www.skool.com/skola-zvuku-9775/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $19/month
🎧 Draft To Master,$49/month,https://www.skool.com/sokolovic-inc-7947/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • $49/month
Kingdom Guitar,Free,https://www.skool.com/kingdom-guitar-7189/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
Keys Players Collective,$25/month,https://www.skool.com/keys-players-collective-5144/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • $25/month
The Guitar Studio,Free,https://www.skool.com/the-guitar-studio-4163/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • Free
Music Industry Academy,$49/month,https://www.skool.com/content-to-cash-8133/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,3 Members • $49/month
Piano Paths,Free,https://www.skool.com/tracy-loftsgaarden-8987/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,4 Members • Free
Soulful Guitar Studio,$25/month,https://www.skool.com/creative-guitar-mastery/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • $25/month
SongMaking & Artistry Course,Free,https://www.skool.com/songmaking-artistry-course-1835/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,7 Members • Free
MISOSOFI-Kid's Music Education,Free,https://www.skool.com/misosofi-1057/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,11 Members • Free
GoodTalk CommunityCollege Free,Free,https://www.skool.com/goodtalk-9984/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • Free
Ignis EDM Production Academy,Free,https://www.skool.com/mixing-made-simple-7532/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • Free
Soulspeak Music,Free,https://www.skool.com/soulspeak-music-1631/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,10 Members • Free
Musician OS,Free,https://www.skool.com/musician-os-1023/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
Feldenkrais,Free,https://www.skool.com/feldenkrais-1159/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8 Members • Free
Beyond The DJ,Free,https://www.skool.com/beyond-the-dj-3402/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
Songwriting Simplified,Free,https://www.skool.com/songwriting-simplified-5258/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,5 Members • Free
JL PRODUCER COLLECTIVE,Free,https://www.skool.com/jl-producer-community-2626/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,2 Members • Free
House Music,Free,https://www.skool.com/modal-1881/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,9 Members • Free
Cover Artist Accelerator,$400/month,https://www.skool.com/cover-artist-accelerator-8105/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,14 Members • $400/month
Gitar Çal,$200/month,https://www.skool.com/gitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,156 Members • $200/month
Müzik Üniversitesi (Ücretsiz),Free,https://www.skool.com/muzik/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,8.1k Members • Free
Comunidad de Guitarra Flamenca,$35/month,https://www.skool.com/comunidad-de-guitarra-flamenca/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,136 Members • $35/month
Jazz Guitar Accelerator,$500/month,https://www.skool.com/jazz-guitar/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,187 Members • $500/month
Music Money VIP,$997,https://www.skool.com/muzicmoneyvip/about?utm_source=skooldotcom&utm_medium=website&utm_campaign=discovery_group_link&utm_content=browse,403 Members • $997`;

const TOP500_CSV = `community_name,price,community_url,total_members
"That Pickleball School","$39/month","https://www.skool.com/thatpickleballschool?ref=009cad01267c4da0ac6862ad898ae902",1300
"AI Automation Society","Free","https://www.skool.com/ai-automation-society?ref=009cad01267c4da0ac6862ad898ae902",211900
"Calligraphy Skool","$9/month","https://www.skool.com/calligraphy?ref=009cad01267c4da0ac6862ad898ae902",1200
"Ina's Dance Academy","$99/month","https://www.skool.com/inasdanceacademy?ref=009cad01267c4da0ac6862ad898ae902",464
"Skoolers","Free","https://www.skool.com/skoolers?ref=009cad01267c4da0ac6862ad898ae902",182500
"The Lady Change","$49/month","https://www.skool.com/theladychange?ref=009cad01267c4da0ac6862ad898ae902",1200
"The Aspinall Way","Free","https://www.skool.com/theaspinallway?ref=009cad01267c4da0ac6862ad898ae902",25100
"Zero To Founder by Tom Bilyeu","$119/month","https://www.skool.com/tom-bilyeu?ref=009cad01267c4da0ac6862ad898ae902",2200
"Day by Day Wellness Club","Free","https://www.skool.com/daybydayclub?ref=009cad01267c4da0ac6862ad898ae902",61200
"Unison Producer Growth Hub","Free","https://www.skool.com/unison-producer-growth-hub?ref=009cad01267c4da0ac6862ad898ae902",40300
"The Acting Lab","$199/month","https://www.skool.com/the-acting-lab?ref=009cad01267c4da0ac6862ad898ae902",190
"School of Mentors","$29/month","https://www.skool.com/schoolofmentors?ref=009cad01267c4da0ac6862ad898ae902",6200
"Pocket Singers FREE","Free","https://www.skool.com/pocketsingersfree?ref=009cad01267c4da0ac6862ad898ae902",14200
"Dating With Gracie","$6,000/year","https://www.skool.com/dating?ref=009cad01267c4da0ac6862ad898ae902",92
"The Screen Time Adventure","$21/month","https://www.skool.com/adventure?ref=009cad01267c4da0ac6862ad898ae902",329
"TFW Global","$35/month","https://www.skool.com/trading-for-women?ref=009cad01267c4da0ac6862ad898ae902",3200
"ACQ Scale Advisory","Free","https://www.skool.com/acq?ref=009cad01267c4da0ac6862ad898ae902",1000
"Bourbonado Community","Free","https://www.skool.com/bourbonado?ref=009cad01267c4da0ac6862ad898ae902",1800
"The Kingdom Lounge","Free","https://www.skool.com/the-kingdom-lounge?ref=009cad01267c4da0ac6862ad898ae902",3200
"Mikey's Money House","$8/month","https://www.skool.com/mikeysmoneyhouse?ref=009cad01267c4da0ac6862ad898ae902",4300
"Brotherhood Of Scent","Free","https://www.skool.com/bos?ref=009cad01267c4da0ac6862ad898ae902",9600
"Kickstarter Challenge","Free","https://www.skool.com/lwp-kickstarter?ref=009cad01267c4da0ac6862ad898ae902",23900
"𝙂𝙊𝙊𝙎𝙄𝙁𝙔 🍓🐛🦋🌈⭐️🩷","Free","https://www.skool.com/goosify?ref=009cad01267c4da0ac6862ad898ae902",8500
"4biddenknowledge Academy","$55/month","https://www.skool.com/4biddenknowledge?ref=009cad01267c4da0ac6862ad898ae902",1400
"Abbew Crew","$17/month","https://www.skool.com/abbewcrew?ref=009cad01267c4da0ac6862ad898ae902",21400
"Self Inquiry Support Group","Free","https://www.skool.com/sunnysharmasupport?ref=009cad01267c4da0ac6862ad898ae902",6600
"The AI Advantage","Free","https://www.skool.com/the-ai-advantage?ref=009cad01267c4da0ac6862ad898ae902",65400
"Make $1k-$10k in 30 days","Free","https://www.skool.com/make-1k-5k-in-30-days-8449?ref=009cad01267c4da0ac6862ad898ae902",10500
"AI Automation Agency Hub","Free","https://www.skool.com/learn-ai?ref=009cad01267c4da0ac6862ad898ae902",275600
"Life Youniversity","$49/month","https://www.skool.com/lifeyouniversity?ref=009cad01267c4da0ac6862ad898ae902",42
"Free Skool Course","Free","https://www.skool.com/free-course?ref=009cad01267c4da0ac6862ad898ae902",10800
"ANIME SHREDS - THE DOJO","$297/year","https://www.skool.com/animeshreds?ref=009cad01267c4da0ac6862ad898ae902",2400
"AI Automation (A-Z)","Free","https://www.skool.com/freegroup?ref=009cad01267c4da0ac6862ad898ae902",119100
"Lion Mode Club","$69/month","https://www.skool.com/lmc?ref=009cad01267c4da0ac6862ad898ae902",2100
"Franzese Family","$20/month","https://www.skool.com/franzese-family?ref=009cad01267c4da0ac6862ad898ae902",836
"Pink Print Prep Skool™ (P3)","$1","https://www.skool.com/pink-print-prep-skool-p3?ref=009cad01267c4da0ac6862ad898ae902",1100
"Real Men Real Style Community","Free","https://www.skool.com/rmrs?ref=009cad01267c4da0ac6862ad898ae902",13900
"Imperium Academy™","Free","https://www.skool.com/academy?ref=009cad01267c4da0ac6862ad898ae902",32900
"Di-Maccio Art Academy","Free","https://www.skool.com/di-maccio-art-academy-free?ref=009cad01267c4da0ac6862ad898ae902",4100
"Photography Academy PRIME","$47/month","https://www.skool.com/photographyacademyprime?ref=009cad01267c4da0ac6862ad898ae902",563
"Reality Revolution","$57/month","https://www.skool.com/realityrevolution?ref=009cad01267c4da0ac6862ad898ae902",786
"Business & Grant Community","$47/month","https://www.skool.com/business-and-grant-mentorship-9581?ref=009cad01267c4da0ac6862ad898ae902",4600
"The Shining Stars Community","$1/month","https://www.skool.com/shiningstarscommunity?ref=009cad01267c4da0ac6862ad898ae902",5200
"Maker School","$184/month","https://www.skool.com/makerschool?ref=009cad01267c4da0ac6862ad898ae902",2300
"AI Content Creators","$5/month","https://www.skool.com/ai-content-creators-7093?ref=009cad01267c4da0ac6862ad898ae902",3200
"⭕️ Círculo de Crecimiento","$40/month","https://www.skool.com/circulodecrecimiento?ref=009cad01267c4da0ac6862ad898ae902",1200
"Unlimited Wisdom","Free","https://www.skool.com/unlimitedwisdom?ref=009cad01267c4da0ac6862ad898ae902",876
"Player Accelerator","$397/year","https://www.skool.com/zth-champions-club?ref=009cad01267c4da0ac6862ad898ae902",4900
"Community Creators Club","Free","https://www.skool.com/actiontaker?ref=009cad01267c4da0ac6862ad898ae902",6200
"Bulletproof Cycling Club","$99/month","https://www.skool.com/bulletproof?ref=009cad01267c4da0ac6862ad898ae902",823
"ETERNAL LIFE TRIBE","$55/month","https://www.skool.com/eternallifetribe?ref=009cad01267c4da0ac6862ad898ae902",2800
"KubeCraft Career Accelerator","$4,800/year","https://www.skool.com/kubecraft?ref=009cad01267c4da0ac6862ad898ae902",825
"Watch Lover | Community","Free","https://www.skool.com/watch-lover?ref=009cad01267c4da0ac6862ad898ae902",2600
"Studio Era Society","Free","https://www.skool.com/studio-era?ref=009cad01267c4da0ac6862ad898ae902",5900
"The Skool Hub","Free","https://www.skool.com/theskoolhub?ref=009cad01267c4da0ac6862ad898ae902",2900
"Wholesaling Real Estate","Free","https://www.skool.com/wholesaling?ref=009cad01267c4da0ac6862ad898ae902",60500
"Synthesizer","Free","https://www.skool.com/synthesizer?ref=009cad01267c4da0ac6862ad898ae902",33300
"Total Goalkeeping","Free","https://www.skool.com/goalkeeper?ref=009cad01267c4da0ac6862ad898ae902",6600
"Story Hacker Silver","$7","https://www.skool.com/story-hacker-silver?ref=009cad01267c4da0ac6862ad898ae902",7400
"Magical Transformations","$23/month","https://www.skool.com/magical-transformations?ref=009cad01267c4da0ac6862ad898ae902",631
"Grow With Evelyn","$33/month","https://www.skool.com/evelyn?ref=009cad01267c4da0ac6862ad898ae902",2300
"The Grim Circle","$39/month","https://www.skool.com/grim?ref=009cad01267c4da0ac6862ad898ae902",1100
"Skate Life","Free","https://www.skool.com/skate?ref=009cad01267c4da0ac6862ad898ae902",11900
"SWC 2.0 The Level Up","Free","https://www.skool.com/swc-20-the-level-up-2554?ref=009cad01267c4da0ac6862ad898ae902",21400
"YouTube Basics","$297","https://www.skool.com/youtubebasics?ref=009cad01267c4da0ac6862ad898ae902",361
"The FitMama Club","$97/month","https://www.skool.com/fitmama-club?ref=009cad01267c4da0ac6862ad898ae902",139
"The Way Of The Surfer","$29/month","https://www.skool.com/thewayofthesurfer?ref=009cad01267c4da0ac6862ad898ae902",49
"Creator Profits","Free","https://www.skool.com/creatorprofits?ref=009cad01267c4da0ac6862ad898ae902",16200
"Ecom Excellence Hub","$97/month","https://www.skool.com/excellencehub?ref=009cad01267c4da0ac6862ad898ae902",1100
"Reinillonarias Club","$32/month","https://www.skool.com/reinillonariasmembership?ref=009cad01267c4da0ac6862ad898ae902",384
"SAT Prep","Free","https://www.skool.com/sat?ref=009cad01267c4da0ac6862ad898ae902",15000
"The NO BS Society! (FREE)","Free","https://www.skool.com/the-no-bs-society-8847?ref=009cad01267c4da0ac6862ad898ae902",671
"GROUP HOME MASTERY MENTORSHIP","$5,000","https://www.skool.com/group-home-mastery-mentorship-9418?ref=009cad01267c4da0ac6862ad898ae902",251
"High Vibe Tribe","Free","https://www.skool.com/highvibetribe?ref=009cad01267c4da0ac6862ad898ae902",78300
"ABV Society","$10/month","https://www.skool.com/abv-society?ref=009cad01267c4da0ac6862ad898ae902",92
"AI Cyber Value Creators","Free","https://www.skool.com/ai-cyber-value-creators?ref=009cad01267c4da0ac6862ad898ae902",7600
"English Paper Piecing Society","$7/month","https://www.skool.com/epp?ref=009cad01267c4da0ac6862ad898ae902",159
"The Neuro-Coach Method -Gratis","Free","https://www.skool.com/the-neuro-coach-method-free?ref=009cad01267c4da0ac6862ad898ae902",2600
"PM Mastermind","$27/month","https://www.skool.com/pmp-mastermind-3105?ref=009cad01267c4da0ac6862ad898ae902",1800
"Camp Nursing School","$19/month","https://www.skool.com/campnursingschool?ref=009cad01267c4da0ac6862ad898ae902",2500
"Héroes Club ⭐️🟠","$9/month","https://www.skool.com/heroesclub?ref=009cad01267c4da0ac6862ad898ae902",194
"Commozi","Free","https://www.skool.com/commozi?ref=009cad01267c4da0ac6862ad898ae902",54
"Tsk Diet ( Premium Community )","$25/month","https://www.skool.com/tsk-diet-premium-community?ref=009cad01267c4da0ac6862ad898ae902",162
"Money Manifestation Mastermind","$33/month","https://www.skool.com/powerful-manifestor-mastermind?ref=009cad01267c4da0ac6862ad898ae902",81
"Digital Wealth Academy 3.0","Free","https://www.skool.com/the-digital-wealth-academy-1240?ref=009cad01267c4da0ac6862ad898ae902",132700
"Exploring Peptides Community","Free","https://www.skool.com/exploring-peptides-community?ref=009cad01267c4da0ac6862ad898ae902",9000
"AI Automation Society Plus","$94/month","https://www.skool.com/ai-automation-society-plus?ref=009cad01267c4da0ac6862ad898ae902",3100
"The Cyber Range","$99/month","https://www.skool.com/cyber-range?ref=009cad01267c4da0ac6862ad898ae902",1200
"Mobility & Injury Prevention","$29/month","https://www.skool.com/movesmethod?ref=009cad01267c4da0ac6862ad898ae902",141500
"Mark Haughton Manifestation","$49/month","https://www.skool.com/mark-haughton-manifestation-3021?ref=009cad01267c4da0ac6862ad898ae902",516
"Library of Adonis","$37/month","https://www.skool.com/library-of-adonis?ref=009cad01267c4da0ac6862ad898ae902",2500
"AI Automations by Jack","$77/month","https://www.skool.com/aiautomationsbyjack?ref=009cad01267c4da0ac6862ad898ae902",1300
"Story Hacker Gold","Free","https://www.skool.com/story-hacker?ref=009cad01267c4da0ac6862ad898ae902",736
"Poop Scoop Millionaire™","$69/month","https://www.skool.com/poop-scoop-millionaire?ref=009cad01267c4da0ac6862ad898ae902",780
"Standin' on Business","Free","https://www.skool.com/standinonbusiness?ref=009cad01267c4da0ac6862ad898ae902",4700
"Origins","$98/month","https://www.skool.com/origins?ref=009cad01267c4da0ac6862ad898ae902",1000
"the CLASSIFIEDS","Free","https://www.skool.com/classifieds?ref=009cad01267c4da0ac6862ad898ae902",839
"Tantra Nectar","Free","https://www.skool.com/tantra-nectar?ref=009cad01267c4da0ac6862ad898ae902",15700
"The 1550+ Formula","$99/month","https://www.skool.com/satprep?ref=009cad01267c4da0ac6862ad898ae902",256
"Misión: invertir en bolsa","$28/month","https://www.skool.com/invertirenbolsa?ref=009cad01267c4da0ac6862ad898ae902",903
"Prepper Academy","Free","https://www.skool.com/prepper-academy-8588?ref=009cad01267c4da0ac6862ad898ae902",2100
"WinCampaign THRIVE","Free","https://www.skool.com/wincampaignthrive?ref=009cad01267c4da0ac6862ad898ae902",1200
"BBQ Nation","Free","https://www.skool.com/bbqfr?ref=009cad01267c4da0ac6862ad898ae902",2100
"✨AWAKEN✨","Free","https://www.skool.com/awakencommunity?ref=009cad01267c4da0ac6862ad898ae902",3500
"🧘‍♂️Free Kriya Yoga School","Free","https://www.skool.com/the-free-kriya-yoga-school-4754?ref=009cad01267c4da0ac6862ad898ae902",892
"Sales & Leadership Academy","$97/month","https://www.skool.com/elitesalesuniversity?ref=009cad01267c4da0ac6862ad898ae902",541
"Let's Master English","Free","https://www.skool.com/lme?ref=009cad01267c4da0ac6862ad898ae902",3200
"Inversiones para Latinos","$99/month","https://www.skool.com/inversionesparalatinos?ref=009cad01267c4da0ac6862ad898ae902",1400
"Oscar's Community","$39/month","https://www.skool.com/oscars-community?ref=009cad01267c4da0ac6862ad898ae902",4500
"🧘‍♂️Kriya Yoga Masterclass","$50/month","https://www.skool.com/kriya-yoga-school-9164?ref=009cad01267c4da0ac6862ad898ae902",91
"Voice AI Accelerator","Free","https://www.skool.com/voice-ai?ref=009cad01267c4da0ac6862ad898ae902",6700
"Magnetic Memberships","Free","https://www.skool.com/magneticmemberships?ref=009cad01267c4da0ac6862ad898ae902",3500
"Selling Online / Prime Mover","Free","https://www.skool.com/prime-mover?ref=009cad01267c4da0ac6862ad898ae902",33600
"High Achiever Society","Free","https://www.skool.com/highachieversociety?ref=009cad01267c4da0ac6862ad898ae902",5000
"Wholesailors Academy","$20/month","https://www.skool.com/wholesailors?ref=009cad01267c4da0ac6862ad898ae902",1800
"Mandarin Blueprint Lite","Free","https://www.skool.com/mandarin-blueprint-free?ref=009cad01267c4da0ac6862ad898ae902",26200
"New Society","$77/month","https://www.skool.com/new-society?ref=009cad01267c4da0ac6862ad898ae902",401
"Raw Food Romance","$33/month","https://www.skool.com/raw-food-romance-3420?ref=009cad01267c4da0ac6862ad898ae902",316
"The Skoolyard 🧃","Free","https://www.skool.com/play?ref=009cad01267c4da0ac6862ad898ae902",314
"The Movement","$35/month","https://www.skool.com/move?ref=009cad01267c4da0ac6862ad898ae902",903
"Altcoin Pro University","$97/month","https://www.skool.com/altcoin-pro?ref=009cad01267c4da0ac6862ad898ae902",851
"Fitrox Academy","$10/month","https://www.skool.com/fitrox?ref=009cad01267c4da0ac6862ad898ae902",604
"Wonderful World English","Free","https://www.skool.com/wonderful-world-english?ref=009cad01267c4da0ac6862ad898ae902",4700
"The Freedom Accelerator","Free","https://www.skool.com/master-investor-accelerator-7177?ref=009cad01267c4da0ac6862ad898ae902",1400
"Alex Curso Gratuito!","Free","https://www.skool.com/alexcursogratis?ref=009cad01267c4da0ac6862ad898ae902",833
"Photography Skool 📸 🚀","Free","https://www.skool.com/photography-skool-8350?ref=009cad01267c4da0ac6862ad898ae902",281
"MG Academy","$27/month","https://www.skool.com/mgabondance?ref=009cad01267c4da0ac6862ad898ae902",1100
"Digital Monetisation Academy","$15/month","https://www.skool.com/digital-monetisation-academy?ref=009cad01267c4da0ac6862ad898ae902",844
"Generational Revival","Free","https://www.skool.com/generational-revival?ref=009cad01267c4da0ac6862ad898ae902",23900
"Horizontes IA","$50/month","https://www.skool.com/horizontes-ia-9992?ref=009cad01267c4da0ac6862ad898ae902",584
"Fit Pro Limitless Alpha's","$20/month","https://www.skool.com/limitless-alphas?ref=009cad01267c4da0ac6862ad898ae902",234
"CEO Lab (Marketer's Skool)","$77/month","https://www.skool.com/marketers?ref=009cad01267c4da0ac6862ad898ae902",1600
"Natural Living Club","$3/month","https://www.skool.com/natural-living?ref=009cad01267c4da0ac6862ad898ae902",2700
"Holistic Product Tester Group","Free","https://www.skool.com/holistic?ref=009cad01267c4da0ac6862ad898ae902",29100
"The 7-Figure Accelerator","Free","https://www.skool.com/7-figure-accelerator-by-philip-9912?ref=009cad01267c4da0ac6862ad898ae902",7000
"مجتمع الدكتور محمد المهدي","$38/month","https://www.skool.com/dr-mohammad-al-mahdi?ref=009cad01267c4da0ac6862ad898ae902",78
"KI Bande - Vibe Marketing ❤️","$29/month","https://www.skool.com/kibande?ref=009cad01267c4da0ac6862ad898ae902",103
"Houseplant Enthusiasts","Free","https://www.skool.com/plant-enthusiast-6960?ref=009cad01267c4da0ac6862ad898ae902",12700
"Savage Sisters","$59/month","https://www.skool.com/savagesisters?ref=009cad01267c4da0ac6862ad898ae902",103
"FÓRMULA 100k","$47/month","https://www.skool.com/formula-100k?ref=009cad01267c4da0ac6862ad898ae902",1400
"OfferLab","Free","https://www.skool.com/offerlabsecrets?ref=009cad01267c4da0ac6862ad898ae902",9500
"Very Social Animal","Free","https://www.skool.com/verysocialanimal?ref=009cad01267c4da0ac6862ad898ae902",2400
"EF Trading Premium","$99/month","https://www.skool.com/ef-trading?ref=009cad01267c4da0ac6862ad898ae902",451
"Shonen Strength","$67","https://www.skool.com/shonen-strength?ref=009cad01267c4da0ac6862ad898ae902",2400
"The Content Club","Free","https://www.skool.com/lanakearneysocial?ref=009cad01267c4da0ac6862ad898ae902",1800
"We Teach League","Free","https://www.skool.com/we-teach-league?ref=009cad01267c4da0ac6862ad898ae902",9800
"Fund To Freedom","$699/month","https://www.skool.com/fund?ref=009cad01267c4da0ac6862ad898ae902",277
"Inner Journey School🧘🏼‍♂️","$15/month","https://www.skool.com/inner-journey-school?ref=009cad01267c4da0ac6862ad898ae902",711
"CoderCo DevOps Academy","$129/month","https://www.skool.com/coderco?ref=009cad01267c4da0ac6862ad898ae902",771
"Top Chess Community","Free","https://www.skool.com/topchesscommunity?ref=009cad01267c4da0ac6862ad898ae902",18600
"AI Money Lab","Free","https://www.skool.com/ai-seo-with-julian-goldie-1553?ref=009cad01267c4da0ac6862ad898ae902",39100
"The Stronger Human","Free","https://www.skool.com/thestrongerhuman?ref=009cad01267c4da0ac6862ad898ae902",24600
"AI Creator Academy™","Free","https://www.skool.com/aica?ref=009cad01267c4da0ac6862ad898ae902",5800
"Corbellic Art Studio - Elite","$47/month","https://www.skool.com/corbellicstudio?ref=009cad01267c4da0ac6862ad898ae902",201
"The Trading Academy","Free","https://www.skool.com/the-trading-academy?ref=009cad01267c4da0ac6862ad898ae902",2500
"CS2 Improvement Camp","$19/month","https://www.skool.com/cs2improvement?ref=009cad01267c4da0ac6862ad898ae902",689
"THP Jump Training","Free","https://www.skool.com/thp?ref=009cad01267c4da0ac6862ad898ae902",79800
"Project Biohacked","Free","https://www.skool.com/projectbiohacked?ref=009cad01267c4da0ac6862ad898ae902",8700
"Millionaire Mindset","$350/month","https://www.skool.com/mmc?ref=009cad01267c4da0ac6862ad898ae902",1100
"Vibe Coding Academy","$97/month","https://www.skool.com/vibe-coding-academy?ref=009cad01267c4da0ac6862ad898ae902",78
"Ai Creators Academy","Free","https://www.skool.com/ai-creators-academy-8093?ref=009cad01267c4da0ac6862ad898ae902",1000
"Golden Capital Investments","$100/month","https://www.skool.com/golden-capital-investments?ref=009cad01267c4da0ac6862ad898ae902",370
"Krusade Games 🏰","$300/month","https://www.skool.com/kcc?ref=009cad01267c4da0ac6862ad898ae902",294
"Marketing to Millions","$226/month","https://www.skool.com/marketing2millions?ref=009cad01267c4da0ac6862ad898ae902",668
"ITLC","Free","https://www.skool.com/itlc?ref=009cad01267c4da0ac6862ad898ae902",1600
"Social Confidence Club ⚡","Free","https://www.skool.com/confidence?ref=009cad01267c4da0ac6862ad898ae902",3300
"Superior Students","Free","https://www.skool.com/study?ref=009cad01267c4da0ac6862ad898ae902",17200
"Shopify Growth Collective🥂","Free","https://www.skool.com/shopify?ref=009cad01267c4da0ac6862ad898ae902",538
"LYFTA CLUB","$29/month","https://www.skool.com/lyftaclub?ref=009cad01267c4da0ac6862ad898ae902",1600
"Masterclass Academy","$9/month","https://www.skool.com/masterclass-academy?ref=009cad01267c4da0ac6862ad898ae902",807
"(1) Heartfluencer Family ❤️️","Free","https://www.skool.com/successinsider?ref=009cad01267c4da0ac6862ad898ae902",2800
"BYOB: Bring Your Own Business™","Free","https://www.skool.com/byob-bring-your-own-business?ref=009cad01267c4da0ac6862ad898ae902",379
"The Bible Journaling Club","Free","https://www.skool.com/the-bible-journaling-club-9543?ref=009cad01267c4da0ac6862ad898ae902",158
"Kourse (Free)","Free","https://www.skool.com/kourse-free?ref=009cad01267c4da0ac6862ad898ae902",114800
"LIBERAL CLARITY GROUP","$100/year","https://www.skool.com/liberal-clarity-group?ref=009cad01267c4da0ac6862ad898ae902",278
"Residual Earners University","$29/month","https://www.skool.com/residual-earners-university?ref=009cad01267c4da0ac6862ad898ae902",423
"TPE Photography Tribe","$19/month","https://www.skool.com/thephotographiceye?ref=009cad01267c4da0ac6862ad898ae902",252
"Tattoo Masterclass","$39/month","https://www.skool.com/tattoo-incubator?ref=009cad01267c4da0ac6862ad898ae902",936
"Manifestation Masterclass","$48/month","https://www.skool.com/thesoundofuniverse?ref=009cad01267c4da0ac6862ad898ae902",1600
"Frogman Tactical Academy","$30/month","https://www.skool.com/protect?ref=009cad01267c4da0ac6862ad898ae902",289
"Magical Transformations (Free)","Free","https://www.skool.com/disney-adult-fitness?ref=009cad01267c4da0ac6862ad898ae902",12700
"Chase AI Community","Free","https://www.skool.com/chase-ai-community?ref=009cad01267c4da0ac6862ad898ae902",28300
"Your First $5k Club w/ARLAN","$50/year","https://www.skool.com/yourfirst5k?ref=009cad01267c4da0ac6862ad898ae902",2500
"HAMZA BHM POD KING CLUB 👑","$49/year","https://www.skool.com/hamzabhm?ref=009cad01267c4da0ac6862ad898ae902",2400
"Sawdust Startups","$59/month","https://www.skool.com/sawduststartups?ref=009cad01267c4da0ac6862ad898ae902",543
"ABC Academy","Free","https://www.skool.com/abc-academy-3941?ref=009cad01267c4da0ac6862ad898ae902",749
"Dadland","$3,000/year","https://www.skool.com/dadland-1973?ref=009cad01267c4da0ac6862ad898ae902",84
"God Tier Ecom","$199/month","https://www.skool.com/godtierecom?ref=009cad01267c4da0ac6862ad898ae902",477
"Circular Machine Knitting Addi","Free","https://www.skool.com/circular-machine-knitting?ref=009cad01267c4da0ac6862ad898ae902",859
"The RoboNuggets Community","$97/month","https://www.skool.com/robonuggets?ref=009cad01267c4da0ac6862ad898ae902",1400
"VoiceOver School","$47/month","https://www.skool.com/voiceoverschool?ref=009cad01267c4da0ac6862ad898ae902",260
"Team3DAlpha","$10/month","https://www.skool.com/team3dalpha?ref=009cad01267c4da0ac6862ad898ae902",3400
"MPM Job Hunt - ELITE","$361/month","https://www.skool.com/mpm-unlimited-3396?ref=009cad01267c4da0ac6862ad898ae902",331
"Her Influence Academy","Free","https://www.skool.com/herinfluenceacademy?ref=009cad01267c4da0ac6862ad898ae902",441
"ADHD Focus Founders","Free","https://www.skool.com/focus-founders-free?ref=009cad01267c4da0ac6862ad898ae902",894
"Mogwarts™","$19/month","https://www.skool.com/mogwarts?ref=009cad01267c4da0ac6862ad898ae902",1800
"Funnel Hackers AI","$17/month","https://www.skool.com/funnel-hackers-ai?ref=009cad01267c4da0ac6862ad898ae902",1300
"Zen 30 Days English","$10","https://www.skool.com/live-with-english-voi-zen-7710?ref=009cad01267c4da0ac6862ad898ae902",66
"🪷 Be Your Own Medium","Free","https://www.skool.com/medium?ref=009cad01267c4da0ac6862ad898ae902",328
"Skool Speedrun (Free)","Free","https://www.skool.com/free?ref=009cad01267c4da0ac6862ad898ae902",11600
"Official Infinity Hoop","Free","https://www.skool.com/infinity-hoop?ref=009cad01267c4da0ac6862ad898ae902",4600
"Crypto Collective","$17/month","https://www.skool.com/crypto-collective?ref=009cad01267c4da0ac6862ad898ae902",801
"Método AIRA","$17/month","https://www.skool.com/metodoaira?ref=009cad01267c4da0ac6862ad898ae902",650
"Jobsties Academy","$65/month","https://www.skool.com/jobsties-academy?ref=009cad01267c4da0ac6862ad898ae902",212
"Ventures Fly Co.","Free","https://www.skool.com/ventures-fly-co?ref=009cad01267c4da0ac6862ad898ae902",4500
"Spiritual Rebels","Free","https://www.skool.com/spiritual-rebels?ref=009cad01267c4da0ac6862ad898ae902",2200
"Embroidery Legacy Software Hub","Free","https://www.skool.com/embroidery-legacy?ref=009cad01267c4da0ac6862ad898ae902",1600
"Mentalidad de Fuego","$30/month","https://www.skool.com/mentalidaddefuego?ref=009cad01267c4da0ac6862ad898ae902",248
"AI Content Creator Community","Free","https://www.skool.com/aicontentcommunity?ref=009cad01267c4da0ac6862ad898ae902",2700
"GenHQ - Creative AI Education","$97/month","https://www.skool.com/genhq?ref=009cad01267c4da0ac6862ad898ae902",1000
"Fighters Community","$37/month","https://www.skool.com/fighters-community?ref=009cad01267c4da0ac6862ad898ae902",692
"Talas Akademija","$70/month","https://www.skool.com/talasakademija?ref=009cad01267c4da0ac6862ad898ae902",1300
"Supermodel Academy (Beginners)","Free","https://www.skool.com/supermodel-academy-3812?ref=009cad01267c4da0ac6862ad898ae902",6300
"Daru Strong Club","$12/month","https://www.skool.com/darustrong?ref=009cad01267c4da0ac6862ad898ae902",223
"WeScale Accelerator","$149/month","https://www.skool.com/wescale?ref=009cad01267c4da0ac6862ad898ae902",656
"The Black Sheep Community","$97/month","https://www.skool.com/blacksheep-community?ref=009cad01267c4da0ac6862ad898ae902",386
"Blackthorne Capital","$49/month","https://www.skool.com/blackthornecapital?ref=009cad01267c4da0ac6862ad898ae902",59
"The Pro Player Pathway","$197","https://www.skool.com/theproplayerpathway?ref=009cad01267c4da0ac6862ad898ae902",184
"Elite Achievers","$40/month","https://www.skool.com/eliteachievers?ref=009cad01267c4da0ac6862ad898ae902",272
"The Survival Gardener","$24/month","https://www.skool.com/the-survival-gardener?ref=009cad01267c4da0ac6862ad898ae902",170
"Embrace the Space","Free","https://www.skool.com/embrace-the-space-7828?ref=009cad01267c4da0ac6862ad898ae902",2800
"Magdiel Marketing Academy","$40/month","https://www.skool.com/magdielmarketingacademy?ref=009cad01267c4da0ac6862ad898ae902",389
"AI Design & Grow Experience","$47/month","https://www.skool.com/etsydesignclub?ref=009cad01267c4da0ac6862ad898ae902",1000
"Magnetic Circle","$97/month","https://www.skool.com/magneticcircle?ref=009cad01267c4da0ac6862ad898ae902",521
"CyberCircle","Free","https://www.skool.com/cyber?ref=009cad01267c4da0ac6862ad898ae902",83200
"Ellis Academy","$189/year","https://www.skool.com/ellisacademy?ref=009cad01267c4da0ac6862ad898ae902",318
"Max Business School™","Free","https://www.skool.com/max-business-school?ref=009cad01267c4da0ac6862ad898ae902",261700
"Creator Boost Tribe","Free","https://www.skool.com/creatorboost?ref=009cad01267c4da0ac6862ad898ae902",8900
"AI Business Trailblazers Hive","Free","https://www.skool.com/ai-biz-trailblazers-hive?ref=009cad01267c4da0ac6862ad898ae902",12700
"AI Automations by Kia","$1/month","https://www.skool.com/ai-automations-by-kia?ref=009cad01267c4da0ac6862ad898ae902",21800
"Automation Fast Track","Free","https://www.skool.com/automation-fast-track-5794?ref=009cad01267c4da0ac6862ad898ae902",8
"PEPGANG","Free","https://www.skool.com/pepgang-6864?ref=009cad01267c4da0ac6862ad898ae902",372
"Cyber Careers Community","Free","https://www.skool.com/cyber-careers-community?ref=009cad01267c4da0ac6862ad898ae902",2700
"Law of Attraction VIP Academy","$29/month","https://www.skool.com/lawofattraction?ref=009cad01267c4da0ac6862ad898ae902",132
"Unshakeable Entrepreneurs","Free","https://www.skool.com/selfmastery?ref=009cad01267c4da0ac6862ad898ae902",128
"Midas Touch ⚡️ Trading","$47/month","https://www.skool.com/the-midas-touch-trading-group-2105?ref=009cad01267c4da0ac6862ad898ae902",917
"Classy Business Circle","Free","https://www.skool.com/classy-business-circle?ref=009cad01267c4da0ac6862ad898ae902",595
"She Sells","Free","https://www.skool.com/she-sells-with-brooke?ref=009cad01267c4da0ac6862ad898ae902",1800
"Make the Damn Video Challenge","Free","https://www.skool.com/tamara-gabriel-4636?ref=009cad01267c4da0ac6862ad898ae902",552
"52 Week Guitar Player 3.0","$667/month","https://www.skool.com/52weekguitarplayer?ref=009cad01267c4da0ac6862ad898ae902",397
"Official Founders Club","Free","https://www.skool.com/official-founders-club-9304?ref=009cad01267c4da0ac6862ad898ae902",2400
"Gamify SAT","Free","https://www.skool.com/gamifysat?ref=009cad01267c4da0ac6862ad898ae902",9600
"Online Business Friends","$10/month","https://www.skool.com/obf?ref=009cad01267c4da0ac6862ad898ae902",83100
"Brunettilandia","Free","https://www.skool.com/brunettilandia-3934?ref=009cad01267c4da0ac6862ad898ae902",6900
"Manifestation Accelerator","$49/month","https://www.skool.com/scotthaugofficial?ref=009cad01267c4da0ac6862ad898ae902",805
"AI Video Bootcamp","$9/month","https://www.skool.com/aivideobootcamp?ref=009cad01267c4da0ac6862ad898ae902",753
"Growth Squad Heroes","Free","https://www.skool.com/skool-with-jules-7093?ref=009cad01267c4da0ac6862ad898ae902",129
"Project Bellplex","$40/month","https://www.skool.com/projectbellplex?ref=009cad01267c4da0ac6862ad898ae902",725
"Anto Ecom Club","$39/month","https://www.skool.com/antoecomclub?ref=009cad01267c4da0ac6862ad898ae902",1400
"💕 Connect & Collab ⭐","$7/month","https://www.skool.com/connect?ref=009cad01267c4da0ac6862ad898ae902",307
"Community MasterClass","$99/month","https://www.skool.com/community-business?ref=009cad01267c4da0ac6862ad898ae902",281
"Trading Bootcamp","$200/month","https://www.skool.com/trading-bootcamp-2253?ref=009cad01267c4da0ac6862ad898ae902",2000
"MONETIZA ACADEMY","$50/month","https://www.skool.com/monetizaacademy?ref=009cad01267c4da0ac6862ad898ae902",1200
"Ecom Edge Accelerator","Free","https://www.skool.com/ecom-edge-1394?ref=009cad01267c4da0ac6862ad898ae902",3000
"Elite Sales Alliance","Free","https://www.skool.com/elitesalesalliance?ref=009cad01267c4da0ac6862ad898ae902",21900
"Business Builders Club","Free","https://www.skool.com/bbc?ref=009cad01267c4da0ac6862ad898ae902",520
"Agency Owners","Free","https://www.skool.com/agencyowners?ref=009cad01267c4da0ac6862ad898ae902",17700
"VSA Avengers","Free","https://www.skool.com/vsa-avengers?ref=009cad01267c4da0ac6862ad898ae902",128
"Medical Courier Community","Free","https://www.skool.com/medical-courier-group-5674?ref=009cad01267c4da0ac6862ad898ae902",18900
"Fast Track Trustee","$19/month","https://www.skool.com/fasttracktrustee?ref=009cad01267c4da0ac6862ad898ae902",368
"LA TRIBU DJ","$10,000","https://www.skool.com/latribudj?ref=009cad01267c4da0ac6862ad898ae902",171
"Med & Mr. X Mentorship","$27/month","https://www.skool.com/itsmedait?ref=009cad01267c4da0ac6862ad898ae902",95
"NeuroSpicy Community","$29/month","https://www.skool.com/neurospicy?ref=009cad01267c4da0ac6862ad898ae902",1400
"SHARKS","$62/month","https://www.skool.com/sharkecomcommunity?ref=009cad01267c4da0ac6862ad898ae902",873
"The 1% in AI","$33/month","https://www.skool.com/top1percent?ref=009cad01267c4da0ac6862ad898ae902",792
"Path to Profits Elite","Free","https://www.skool.com/path-to-profits-elite-5976?ref=009cad01267c4da0ac6862ad898ae902",6200
"Feminine Energy Academy🌹💍💰","$47/month","https://www.skool.com/feminineenergyacademy?ref=009cad01267c4da0ac6862ad898ae902",382
"AI Creator Bootcamp","$5/month","https://www.skool.com/aicreatorbootcamp?ref=009cad01267c4da0ac6862ad898ae902",1900
"EasyGrow 2.0™","Free","https://www.skool.com/easygrow?ref=009cad01267c4da0ac6862ad898ae902",784
"Skate IQ Team","$9/month","https://www.skool.com/skateiq?ref=009cad01267c4da0ac6862ad898ae902",1000
"Millionaire Women Collective","Free","https://www.skool.com/millionaire-women-collective-2953?ref=009cad01267c4da0ac6862ad898ae902",9800
"Path of the Dragon","Free","https://www.skool.com/dragon?ref=009cad01267c4da0ac6862ad898ae902",182
"Business Synergy Sisterhood","Free","https://www.skool.com/synergy?ref=009cad01267c4da0ac6862ad898ae902",5200
"Total Reset Coaching","Free","https://www.skool.com/total-reset-coaching?ref=009cad01267c4da0ac6862ad898ae902",56
"Crap Academy","Free","https://www.skool.com/crap-academy?ref=009cad01267c4da0ac6862ad898ae902",168
"Davie's Free Ecom Course","Free","https://www.skool.com/davies-free-ecom-course?ref=009cad01267c4da0ac6862ad898ae902",70500
"Russian Chess School","$29/month","https://www.skool.com/russianchessschool?ref=009cad01267c4da0ac6862ad898ae902",373
"Nicky Alan Spirit Skool","Free","https://www.skool.com/nicky-alan-spirit-tribe-1111?ref=009cad01267c4da0ac6862ad898ae902",600
"Prosperity School","$1,497","https://www.skool.com/prosperity-school?ref=009cad01267c4da0ac6862ad898ae902",641
"Focus Revolution by ADHDVision","Free","https://www.skool.com/focus-revolution?ref=009cad01267c4da0ac6862ad898ae902",1000
"New Status Nation","$47/month","https://www.skool.com/newstatus?ref=009cad01267c4da0ac6862ad898ae902",74
"The Submissive Society","$97/month","https://www.skool.com/the-submissive-society?ref=009cad01267c4da0ac6862ad898ae902",204
"Budgetdog Academy","Free","https://www.skool.com/budgetdog-academy?ref=009cad01267c4da0ac6862ad898ae902",1800
"🇫🇷 DCA Club FR","Free","https://www.skool.com/dcaclubfr?ref=009cad01267c4da0ac6862ad898ae902",148
"Ilana's Method","$4,999/year","https://www.skool.com/method?ref=009cad01267c4da0ac6862ad898ae902",828
"AI Automation Mastery","Free","https://www.skool.com/ai-automation-mastery-group?ref=009cad01267c4da0ac6862ad898ae902",21800
"The Flock","$15/month","https://www.skool.com/theflock?ref=009cad01267c4da0ac6862ad898ae902",121
"Marriage Reset Support","Free","https://www.skool.com/marriage-reset-support-5825?ref=009cad01267c4da0ac6862ad898ae902",513
"FWTLO","Free","https://www.skool.com/fwtlo?ref=009cad01267c4da0ac6862ad898ae902",223
"Savage Dad Fitness","Free","https://www.skool.com/savage-dads-9017?ref=009cad01267c4da0ac6862ad898ae902",133
"The Nurse in Progress Club","$27","https://www.skool.com/thenurseinprogressclub?ref=009cad01267c4da0ac6862ad898ae902",778
"Vix Queenkim Academy","Free","https://www.skool.com/vix-queenkim-academy-8367?ref=009cad01267c4da0ac6862ad898ae902",550
"Builders by Buildy.ai","Free","https://www.skool.com/buildy?ref=009cad01267c4da0ac6862ad898ae902",2500
"WeScale (Free)","Free","https://www.skool.com/heckman?ref=009cad01267c4da0ac6862ad898ae902",23100
"Staking Pro 24","$997","https://www.skool.com/stakingpro24?ref=009cad01267c4da0ac6862ad898ae902",306
"NeuroImprint™","Free","https://www.skool.com/manifestation-activation?ref=009cad01267c4da0ac6862ad898ae902",8400
"Make It Viral","Free","https://www.skool.com/makeitviral?ref=009cad01267c4da0ac6862ad898ae902",1300
"Basterd Crew","$9/month","https://www.skool.com/basterd?ref=009cad01267c4da0ac6862ad898ae902",51
"Creatopia","$77/month","https://www.skool.com/creatopia?ref=009cad01267c4da0ac6862ad898ae902",506
"Trinity Code","Free","https://www.skool.com/trinity-code-2714?ref=009cad01267c4da0ac6862ad898ae902",67
"Sin Miedo A Volar","$59/month","https://www.skool.com/sin-miedo-a-volar?ref=009cad01267c4da0ac6862ad898ae902",227
"Dijital Girişimcilik Okulu","$999/month","https://www.skool.com/dijital-girisimcilik-okulu?ref=009cad01267c4da0ac6862ad898ae902",482
"FACEFORWARD AI™","Free","https://www.skool.com/faceforward-ai-9538?ref=009cad01267c4da0ac6862ad898ae902",5200
"THE FREE WAY MECHANICS","Free","https://www.skool.com/the-free-way-mechanics-4425?ref=009cad01267c4da0ac6862ad898ae902",327
"Main Way to Wealth","Free","https://www.skool.com/monicamain?ref=009cad01267c4da0ac6862ad898ae902",15900
"I Am Free University","$99/month","https://www.skool.com/iamfree-7111?ref=009cad01267c4da0ac6862ad898ae902",183
"Mounjarian Tribe 💜","Free","https://www.skool.com/mounjarian-warriors-8467?ref=009cad01267c4da0ac6862ad898ae902",629
"Foundations of Ascension","Free","https://www.skool.com/foundations-of-ascension-1699?ref=009cad01267c4da0ac6862ad898ae902",8900
"AI Profit Boardroom","$49/month","https://www.skool.com/ai-profit-lab-7462?ref=009cad01267c4da0ac6862ad898ae902",1800
"Level-Up Pro - GCSE Mastery","$48/month","https://www.skool.com/gcse-mental-health-support?ref=009cad01267c4da0ac6862ad898ae902",550
"Learn and Earn Academy","Free","https://www.skool.com/learn-and-earn-academy-2334?ref=009cad01267c4da0ac6862ad898ae902",534
"The Founders Club","Free","https://www.skool.com/the-founders-club?ref=009cad01267c4da0ac6862ad898ae902",60700
"The Human Practice","Free","https://www.skool.com/thehumanpractice?ref=009cad01267c4da0ac6862ad898ae902",173
"Team Ruff","Free","https://www.skool.com/team-ruff-8631?ref=009cad01267c4da0ac6862ad898ae902",13900
"The AI Collective","Free","https://www.skool.com/the-collective-9441?ref=009cad01267c4da0ac6862ad898ae902",301
"True North Aligned","$8/month","https://www.skool.com/true-north-aligned-life?ref=009cad01267c4da0ac6862ad898ae902",167
"The Garden Creator Hub","Free","https://www.skool.com/the-garden-creator-hub-3162?ref=009cad01267c4da0ac6862ad898ae902",155
"🎙️ Voice AI Bootcamp","Free","https://www.skool.com/voice-ai-bootcamp?ref=009cad01267c4da0ac6862ad898ae902",7800
"The Wealth Society","Free","https://www.skool.com/thewealthsociety?ref=009cad01267c4da0ac6862ad898ae902",838
"SWS Private Community","Free","https://www.skool.com/swas-private-community-1576?ref=009cad01267c4da0ac6862ad898ae902",3000
"Trading de Índices Sintéticos","Free","https://www.skool.com/indicessinteticoslmc?ref=009cad01267c4da0ac6862ad898ae902",5800
"The 6-Figure Beauty Society","$25/month","https://www.skool.com/6-figure-beauty-group-4450?ref=009cad01267c4da0ac6862ad898ae902",929
"Hormone Health Advantage","Free","https://www.skool.com/hormone-health-advantage-4313?ref=009cad01267c4da0ac6862ad898ae902",1300
"Synthesizer Scaling","$1,700/month","https://www.skool.com/scaler?ref=009cad01267c4da0ac6862ad898ae902",168
"Communityaufbau (SkooI)","$99/month","https://www.skool.com/communityaufbau?ref=009cad01267c4da0ac6862ad898ae902",537
"Hustle Games - Philip Johansen","Free","https://www.skool.com/hustlegames?ref=009cad01267c4da0ac6862ad898ae902",24800
"Brendan's AI Community","Free","https://www.skool.com/brendan?ref=009cad01267c4da0ac6862ad898ae902",22000
"La TEAM FlashFitHome","$99/month","https://www.skool.com/lateamflashfithome?ref=009cad01267c4da0ac6862ad898ae902",207
"SHREDDERS UNIVERSITY 2.0","$99/month","https://www.skool.com/shreddersuni2?ref=009cad01267c4da0ac6862ad898ae902",131
"Magnetic Love Collective","Free","https://www.skool.com/manifestwithmatt?ref=009cad01267c4da0ac6862ad898ae902",179
"Sync Producer Hub","$67/month","https://www.skool.com/syncproducerhub?ref=009cad01267c4da0ac6862ad898ae902",306
"Rascals Education Academy","$127/month","https://www.skool.com/rascals-academy?ref=009cad01267c4da0ac6862ad898ae902",380
"The Angel Raphael Community","Free","https://www.skool.com/the-angel-raphael-community-3421?ref=009cad01267c4da0ac6862ad898ae902",2700
"Ancient Knowledge Academy","$55/month","https://www.skool.com/ancientknowledgeacademy?ref=009cad01267c4da0ac6862ad898ae902",166
"3.6.9 Community","$49/month","https://www.skool.com/369community?ref=009cad01267c4da0ac6862ad898ae902",366
"Kourse","$10,000/year","https://www.skool.com/kourse?ref=009cad01267c4da0ac6862ad898ae902",724
"AndyNoCode","Free","https://www.skool.com/andynocode?ref=009cad01267c4da0ac6862ad898ae902",26000
"Piano with Rebecca B","$12/month","https://www.skool.com/pianowithrebeccab?ref=009cad01267c4da0ac6862ad898ae902",256
"NDS (No Dumb Sh*t)","$597/year","https://www.skool.com/nds-community?ref=009cad01267c4da0ac6862ad898ae902",210
"AMZ Certification Program","Free","https://www.skool.com/bjku-fba?ref=009cad01267c4da0ac6862ad898ae902",6200
"Simpli Faceless","$27/month","https://www.skool.com/simpli-faceless?ref=009cad01267c4da0ac6862ad898ae902",1100
"High Performance Notary","Free","https://www.skool.com/notary?ref=009cad01267c4da0ac6862ad898ae902",1600
"Win The First 30 Days","Free","https://www.skool.com/wtf?ref=009cad01267c4da0ac6862ad898ae902",843
"CashFlow LIVE","Free","https://www.skool.com/cashflowlive?ref=009cad01267c4da0ac6862ad898ae902",1000
"El Arte de Rediseñarte","$25/month","https://www.skool.com/alessandrolucch?ref=009cad01267c4da0ac6862ad898ae902",268
"Fiel al Plan Club","$10,000/year","https://www.skool.com/fielalplan?ref=009cad01267c4da0ac6862ad898ae902",175
"The Vault","Free","https://www.skool.com/stocks?ref=009cad01267c4da0ac6862ad898ae902",25000
"Futuro Digital Pro","$59/month","https://www.skool.com/futuro-digital-pro?ref=009cad01267c4da0ac6862ad898ae902",455
"Sports Winners Club","$97/month","https://www.skool.com/sba?ref=009cad01267c4da0ac6862ad898ae902",74
"CFS Recovery Academy","$297/month","https://www.skool.com/cfs-recovery-academy-1859?ref=009cad01267c4da0ac6862ad898ae902",458
"Software Developer Academy","Free","https://www.skool.com/software-developer-academy-5620?ref=009cad01267c4da0ac6862ad898ae902",26600
"Casa Palo Mayombe","$349/year","https://www.skool.com/tatanganga?ref=009cad01267c4da0ac6862ad898ae902",294
"English Immersion Academy","$16/month","https://www.skool.com/english-immersion-academy?ref=009cad01267c4da0ac6862ad898ae902",413
"Aligned AF Camp","Free","https://www.skool.com/aligned-af-camp?ref=009cad01267c4da0ac6862ad898ae902",4000
"Pablo Martínez García","Free","https://www.skool.com/pablo-martinez-garcia?ref=009cad01267c4da0ac6862ad898ae902",9400
"Strategic Traders","$147/month","https://www.skool.com/strategictraders?ref=009cad01267c4da0ac6862ad898ae902",226
"Key Learners Piano Club","Free","https://www.skool.com/keylearners?ref=009cad01267c4da0ac6862ad898ae902",736
"AI Freedom Accelerator™","$100/month","https://www.skool.com/digitalfreedommentorship?ref=009cad01267c4da0ac6862ad898ae902",1800
"Evolution Creator Membership","Free","https://www.skool.com/tiktok-1203?ref=009cad01267c4da0ac6862ad898ae902",5000
"Evergreen Foundations","Free","https://www.skool.com/evergreen-evolution-6811?ref=009cad01267c4da0ac6862ad898ae902",326
"1% Club (Elite)","Free","https://www.skool.com/1percentclub?ref=009cad01267c4da0ac6862ad898ae902",478
"La Tribu Divisual","$10,000/month","https://www.skool.com/la-tribu-divisual?ref=009cad01267c4da0ac6862ad898ae902",1200
"The Tax Guru University","$3,500","https://www.skool.com/the-tax-guru-university-7043?ref=009cad01267c4da0ac6862ad898ae902",17
"Skool Growth Free Training Hub","Free","https://www.skool.com/make-money?ref=009cad01267c4da0ac6862ad898ae902",4300
"Content Engine","$17/month","https://www.skool.com/content-engine?ref=009cad01267c4da0ac6862ad898ae902",246
"Universidad del Trader","$50/month","https://www.skool.com/universidaddeltrader?ref=009cad01267c4da0ac6862ad898ae902",56
"REVENUE REVOLUTION","Free","https://www.skool.com/revenuerevolution?ref=009cad01267c4da0ac6862ad898ae902",584
"Faceless Girl Era","Free","https://www.skool.com/faceless-girl-era-9647?ref=009cad01267c4da0ac6862ad898ae902",3000
"Ascension University","$44/month","https://www.skool.com/ascensionuniversity?ref=009cad01267c4da0ac6862ad898ae902",485
"NWM School Mastermind","Free","https://www.skool.com/network-marketing-school-1537?ref=009cad01267c4da0ac6862ad898ae902",428
"⚽️ The Female Footballers Club","Free","https://www.skool.com/the-female-footballers-club?ref=009cad01267c4da0ac6862ad898ae902",174
"WAH Vault w/WAHJobQueen™","$9/month","https://www.skool.com/wahjobqueen?ref=009cad01267c4da0ac6862ad898ae902",2500
"Vende en Redes Sociales","$35/month","https://www.skool.com/vende-en-redes-sociales-3452?ref=009cad01267c4da0ac6862ad898ae902",211
"The Build Room+","$67/month","https://www.skool.com/buildroom?ref=009cad01267c4da0ac6862ad898ae902",2500
"Count Me In","Free","https://www.skool.com/count-me-in-opinions-4-money-4436?ref=009cad01267c4da0ac6862ad898ae902",409
"Kings Hall","$49/month","https://www.skool.com/kings-hall?ref=009cad01267c4da0ac6862ad898ae902",271
"TOKOS ~ Global Mobility ✈️ 🌎","Free","https://www.skool.com/african-network-5065?ref=009cad01267c4da0ac6862ad898ae902",36100
"SkoolHers","Free","https://www.skool.com/skoolhers?ref=009cad01267c4da0ac6862ad898ae902",419
"Printable Sticker Weekend","$27","https://www.skool.com/psw?ref=009cad01267c4da0ac6862ad898ae902",3
"EcomMastery VIP","$9,999/month","https://www.skool.com/ecommastery-vip?ref=009cad01267c4da0ac6862ad898ae902",148
"JQool 線上英語學院","Free","https://www.skool.com/jqool-1333?ref=009cad01267c4da0ac6862ad898ae902",5800
"Harmony","$15/month","https://www.skool.com/harmony?ref=009cad01267c4da0ac6862ad898ae902",11400
"C.S. Joseph","$29/month","https://www.skool.com/csjoseph?ref=009cad01267c4da0ac6862ad898ae902",283
"LOUPIOS VIP-MANIFESTATION GANG","$55/month","https://www.skool.com/loupios-vip-manifestation-gang-8566?ref=009cad01267c4da0ac6862ad898ae902",97
"HolisticAmerican-HealthAcademy","$19/month","https://www.skool.com/holisticamerican?ref=009cad01267c4da0ac6862ad898ae902",3500
"Affinity Creatives","Free","https://www.skool.com/affinity-photo-creatives-6824?ref=009cad01267c4da0ac6862ad898ae902",2000
"EDL GALAXY 🌬️","$50/month","https://www.skool.com/edl-galaxy-8898?ref=009cad01267c4da0ac6862ad898ae902",357
"Early AI-dopters","$59/month","https://www.skool.com/earlyaidopters?ref=009cad01267c4da0ac6862ad898ae902",769
"The Ecom Wolf Den","$99/month","https://www.skool.com/the-ecom-wolf?ref=009cad01267c4da0ac6862ad898ae902",651
"Pronounce Korean 🇰🇷","$30/month","https://www.skool.com/pronounce-korean?ref=009cad01267c4da0ac6862ad898ae902",75
"The Brotherhood™","Free","https://www.skool.com/reclamationprotocol?ref=009cad01267c4da0ac6862ad898ae902",7300
"Jester","Free","https://www.skool.com/jerky-vids-1288?ref=009cad01267c4da0ac6862ad898ae902",69
"Amplify Views","Free","https://www.skool.com/amplifyviews?ref=009cad01267c4da0ac6862ad898ae902",27600
"Incubateur INFLU IA","$47/month","https://www.skool.com/ofm-ia?ref=009cad01267c4da0ac6862ad898ae902",485
"Vicki Planet - Mystery School","$55/month","https://www.skool.com/mysteryschool?ref=009cad01267c4da0ac6862ad898ae902",244
"UNDETERRED Entrepreneurs","Free","https://www.skool.com/undeterred-free?ref=009cad01267c4da0ac6862ad898ae902",613
"So Lead'Her","$65/month","https://www.skool.com/so-leadher?ref=009cad01267c4da0ac6862ad898ae902",637
"Oracle Boxing","$97/month","https://www.skool.com/boxing?ref=009cad01267c4da0ac6862ad898ae902",207
"Alpha School","Free","https://www.skool.com/alpha-school-free-7220?ref=009cad01267c4da0ac6862ad898ae902",2400
"Cortexify🎮","Free","https://www.skool.com/deep-cortex-8963?ref=009cad01267c4da0ac6862ad898ae902",92
"The Chosen Few","$7/month","https://www.skool.com/thechosenfew?ref=009cad01267c4da0ac6862ad898ae902",262
"Money Switch by ECOM REAL","$49","https://www.skool.com/ecomreal?ref=009cad01267c4da0ac6862ad898ae902",2800
"Miss Megan Makeup Revival","$67/month","https://www.skool.com/missmegan?ref=009cad01267c4da0ac6862ad898ae902",140
"n8n KI Agenten","Free","https://www.skool.com/ki-agenten?ref=009cad01267c4da0ac6862ad898ae902",9500
"Copy Mastery","Free","https://www.skool.com/copy-mastery-7492?ref=009cad01267c4da0ac6862ad898ae902",2400
"BELONG","Free","https://www.skool.com/belong?ref=009cad01267c4da0ac6862ad898ae902",299
"RISE & RENEW with ROSHANNA","$18/month","https://www.skool.com/rise-renew-roshanna?ref=009cad01267c4da0ac6862ad898ae902",35
"THE PACK","$5/month","https://www.skool.com/pack?ref=009cad01267c4da0ac6862ad898ae902",41
"Hacksmith’s Peptalk Community","$10/month","https://www.skool.com/hacksmithspeptalk?ref=009cad01267c4da0ac6862ad898ae902",1700
"House of AI Fashion Production","$9/month","https://www.skool.com/production?ref=009cad01267c4da0ac6862ad898ae902",1600
"Peter's Academy","Free","https://www.skool.com/petersacademy?ref=009cad01267c4da0ac6862ad898ae902",6700
"Residual Income for Beginners","Free","https://www.skool.com/cashswipe?ref=009cad01267c4da0ac6862ad898ae902",1300
"AI Video Creators Community","$9/month","https://www.skool.com/ai-video-creators?ref=009cad01267c4da0ac6862ad898ae902",3200
"Better Man, Better Marriage","$27/month","https://www.skool.com/bettermen?ref=009cad01267c4da0ac6862ad898ae902",68
"RECLAIM & REIGN INSTITUTE","Free","https://www.skool.com/reclaim-reign-institute-1661?ref=009cad01267c4da0ac6862ad898ae902",4000
"Affiliate Formula","$500/month","https://www.skool.com/formula?ref=009cad01267c4da0ac6862ad898ae902",379
"THE BLESSING","$5/month","https://www.skool.com/blessing?ref=009cad01267c4da0ac6862ad898ae902",81
"The Virtual Bookkeeping Series","Free","https://www.skool.com/virtualbookkeepingseries?ref=009cad01267c4da0ac6862ad898ae902",67700
"VSA Guardians","Free","https://www.skool.com/vsa-guardians?ref=009cad01267c4da0ac6862ad898ae902",88
"Educated Meatheads","Free","https://www.skool.com/educatedmeatheads?ref=009cad01267c4da0ac6862ad898ae902",2700
"10x Youtube","Free","https://www.skool.com/10x-youtube?ref=009cad01267c4da0ac6862ad898ae902",4100
"The Somatic Academy by Soma+IQ","Free","https://www.skool.com/somaticrelease?ref=009cad01267c4da0ac6862ad898ae902",12300
"InvestCEO with Kyle Henris","Free","https://www.skool.com/investceo-with-kyle-henris-4723?ref=009cad01267c4da0ac6862ad898ae902",38600
"Christ Underground","Free","https://www.skool.com/christ?ref=009cad01267c4da0ac6862ad898ae902",6100
"Facebook Ads Mastery","$147/month","https://www.skool.com/facebookads?ref=009cad01267c4da0ac6862ad898ae902",753
"Vendingpreneurs","$999/month","https://www.skool.com/vendingpreneurs-2122?ref=009cad01267c4da0ac6862ad898ae902",1600
"Ultimate Branding Course","Free","https://www.skool.com/ubc?ref=009cad01267c4da0ac6862ad898ae902",57000
"BIOHACKING HEROES 🦸‍♂️🦸‍♀️","Free","https://www.skool.com/biohackingheroes?ref=009cad01267c4da0ac6862ad898ae902",10700
"Romayroh & Views For Income","$37/month","https://www.skool.com/views-for-income?ref=009cad01267c4da0ac6862ad898ae902",1600
"Mastermind BootCamp","$149/month","https://www.skool.com/masteryourday?ref=009cad01267c4da0ac6862ad898ae902",25
"Self-Improvement Challenge","Free","https://www.skool.com/bsg-4603?ref=009cad01267c4da0ac6862ad898ae902",7100
"Anti Influencer Method™","Free","https://www.skool.com/prc-content-creators-club-5775?ref=009cad01267c4da0ac6862ad898ae902",2100
"AI Experts Club","$47/month","https://www.skool.com/aiexpertsclub?ref=009cad01267c4da0ac6862ad898ae902",2200
"Audio Artist Academy","$7/month","https://www.skool.com/audio-artist-academy?ref=009cad01267c4da0ac6862ad898ae902",1900
"The Solopreneur Initiative","Free","https://www.skool.com/the-solopreneur-initiative?ref=009cad01267c4da0ac6862ad898ae902",2100
"AI-Ker | Cộng đồng AI Sáng tạo","$5/month","https://www.skool.com/ai-ker-8924?ref=009cad01267c4da0ac6862ad898ae902",2100
"Imperio Digital","$49/month","https://www.skool.com/imperio-digital?ref=009cad01267c4da0ac6862ad898ae902",593
"Academia de fotografía","$19/month","https://www.skool.com/foto?ref=009cad01267c4da0ac6862ad898ae902",257
"VSA Legends","Free","https://www.skool.com/vsa-legends?ref=009cad01267c4da0ac6862ad898ae902",101
"Học Tiếng Anh Với Ethan","$33/month","https://www.skool.com/hoc-tieng-anh-voi-ethan?ref=009cad01267c4da0ac6862ad898ae902",465
"The Third Place","Free","https://www.skool.com/wfpb-women-3114?ref=009cad01267c4da0ac6862ad898ae902",145
"The school of life","$50/month","https://www.skool.com/the-school-of-life-3234?ref=009cad01267c4da0ac6862ad898ae902",90
"School of Content Marketing","$98/month","https://www.skool.com/school-of-content-marketing-5537?ref=009cad01267c4da0ac6862ad898ae902",260
"Liberty Politics Discussion","Free","https://www.skool.com/libertypolitics?ref=009cad01267c4da0ac6862ad898ae902",2200
"CLUES","Free","https://www.skool.com/clues?ref=009cad01267c4da0ac6862ad898ae902",117
"Corbellic Art Studio","Free","https://www.skool.com/corbellic-studio-elite-8244?ref=009cad01267c4da0ac6862ad898ae902",1200
"LIBERTY ACADEMY - UNIVERSITY","Free","https://www.skool.com/liberty-academy-game-changer?ref=009cad01267c4da0ac6862ad898ae902",581
"PostGraduate Academy","Free","https://www.skool.com/postgraduate-academy-7355?ref=009cad01267c4da0ac6862ad898ae902",4700
"Jail Support Sisterhood Pro","$9/month","https://www.skool.com/jail-wife-coach-community-3862?ref=009cad01267c4da0ac6862ad898ae902",99
"InvestCEO Boardroom","$2,500/year","https://www.skool.com/100-days-to-freedom-journey-3715?ref=009cad01267c4da0ac6862ad898ae902",979
"The Content Revenue Lab","Free","https://www.skool.com/content-revenue-lab-4761?ref=009cad01267c4da0ac6862ad898ae902",332
"Make Money on Skool","$3/month","https://www.skool.com/skool-coaching-classes-7316?ref=009cad01267c4da0ac6862ad898ae902",113
"Dispatcher University (Free)","Free","https://www.skool.com/gill22?ref=009cad01267c4da0ac6862ad898ae902",14300
"Private Label Masters - VIP","$250/month","https://www.skool.com/privatelabel?ref=009cad01267c4da0ac6862ad898ae902",733
"SheLeads Academy 2.0 🌟","$109","https://www.skool.com/she-leads?ref=009cad01267c4da0ac6862ad898ae902",150
"Income Trader Alliance","$7,995","https://www.skool.com/incometraderalliance?ref=009cad01267c4da0ac6862ad898ae902",494
"Earn, Invest, Be Free","$39/month","https://www.skool.com/iderbat?ref=009cad01267c4da0ac6862ad898ae902",918
"Hacking the IELTS with ChatGPT","$10,000/month","https://www.skool.com/hacking-the-ielts-in-2025-6802?ref=009cad01267c4da0ac6862ad898ae902",1000
"Sketch Like an Architect","Free","https://www.skool.com/sketch-like-an-architect?ref=009cad01267c4da0ac6862ad898ae902",2900
"Ecomliberty","Free","https://www.skool.com/ecomliberty-8960?ref=009cad01267c4da0ac6862ad898ae902",39600
"Ecom Viking","Free","https://www.skool.com/ecom-viking?ref=009cad01267c4da0ac6862ad898ae902",8800
"BrandCollab Latino","$39/month","https://www.skool.com/brandcollab-latino-5292?ref=009cad01267c4da0ac6862ad898ae902",553
"Lifestyle Foundr Group™","Free","https://www.skool.com/lfg?ref=009cad01267c4da0ac6862ad898ae902",9000
"Hope Nation","Free","https://www.skool.com/hopenation?ref=009cad01267c4da0ac6862ad898ae902",1400
"Limitless Training","Free","https://www.skool.com/limitless-training?ref=009cad01267c4da0ac6862ad898ae902",3400
"The Menopause Lab","Free","https://www.skool.com/the-menopause-lab?ref=009cad01267c4da0ac6862ad898ae902",50400
"La Universidad del Apostador","$27/month","https://www.skool.com/la-universidad-del-apostador?ref=009cad01267c4da0ac6862ad898ae902",569
"Taukinglish.com","$20/month","https://www.skool.com/taukinglish-7349?ref=009cad01267c4da0ac6862ad898ae902",115
"Sales Systems Mastery","$89/month","https://www.skool.com/ssmasters?ref=009cad01267c4da0ac6862ad898ae902",303
"Instagram Accelerator","Free","https://www.skool.com/fib?ref=009cad01267c4da0ac6862ad898ae902",42000
"Appointment Setting","Free","https://www.skool.com/appointment-setting-community?ref=009cad01267c4da0ac6862ad898ae902",5400
"AI Masters Community with Ed","Free","https://www.skool.com/ai-masters-community?ref=009cad01267c4da0ac6862ad898ae902",11000
"Six-Figure Copy Academy","$119/month","https://www.skool.com/sixfigurecopyacademy?ref=009cad01267c4da0ac6862ad898ae902",102
"La Tribu del Despertar","$29/month","https://www.skool.com/la-tribu-del-despertar-1330?ref=009cad01267c4da0ac6862ad898ae902",96
"ONA Basecamp","$10/month","https://www.skool.com/ona-basecamp?ref=009cad01267c4da0ac6862ad898ae902",125
"The Ghost Family","Free","https://www.skool.com/the-ghost-family-1230?ref=009cad01267c4da0ac6862ad898ae902",245
"Roulette Profitable","Free","https://www.skool.com/roulette-rentable-jj?ref=009cad01267c4da0ac6862ad898ae902",173
"Sobriety Seven Women","$97/month","https://www.skool.com/sobriety-seven-7269?ref=009cad01267c4da0ac6862ad898ae902",90
"She Attracts Business","$99/month","https://www.skool.com/she-attracts-business?ref=009cad01267c4da0ac6862ad898ae902",684
"Critical Thinking Classroom","$149/month","https://www.skool.com/critical-thinking-classroom-7644?ref=009cad01267c4da0ac6862ad898ae902",300
"Craft & Connect","Free","https://www.skool.com/craft-and-connect?ref=009cad01267c4da0ac6862ad898ae902",1300
"Successful Students","Free","https://www.skool.com/successful-students-5280?ref=009cad01267c4da0ac6862ad898ae902",8700
"Vegan Squad Community","$99/month","https://www.skool.com/vegan-squad?ref=009cad01267c4da0ac6862ad898ae902",214
"Alive Poets Society✍🔥","Free","https://www.skool.com/dead-poets-society-5071?ref=009cad01267c4da0ac6862ad898ae902",1500
"ONLINE WEALTH ACADEMY","Free","https://www.skool.com/online-wealth-academy-home?ref=009cad01267c4da0ac6862ad898ae902",10400
"John’s English Skool","Free","https://www.skool.com/johns-english-skool-3297?ref=009cad01267c4da0ac6862ad898ae902",165
"Academia Handstander","$33/month","https://www.skool.com/academia-handstander?ref=009cad01267c4da0ac6862ad898ae902",231
"Running Drummer LCG","$1/month","https://www.skool.com/running-drummer-lcg-6938?ref=009cad01267c4da0ac6862ad898ae902",152
"Snipe University","$97/month","https://www.skool.com/sniper-society?ref=009cad01267c4da0ac6862ad898ae902",649
"12x Community","Free","https://www.skool.com/12x-community?ref=009cad01267c4da0ac6862ad898ae902",242
"Breakthrough Elites - Core","$97/month","https://www.skool.com/bte?ref=009cad01267c4da0ac6862ad898ae902",113
"IA MAKERS","$59/month","https://www.skool.com/ia-makers?ref=009cad01267c4da0ac6862ad898ae902",2900
"Mellovator Fam University","$9/month","https://www.skool.com/mfu?ref=009cad01267c4da0ac6862ad898ae902",194
"Advertise Your Skool","Free","https://www.skool.com/advertise-your-skool-6625?ref=009cad01267c4da0ac6862ad898ae902",143
"Merkle Entrepreneurs","Free","https://www.skool.com/merkle-entrepreneurs-6992?ref=009cad01267c4da0ac6862ad898ae902",1400
"Male Commitment Decoded","Free","https://www.skool.com/male-commitment-decoded?ref=009cad01267c4da0ac6862ad898ae902",74
"Pure Life Mindset","Free","https://www.skool.com/purelifemindset?ref=009cad01267c4da0ac6862ad898ae902",1700
"Creator Club","$45/month","https://www.skool.com/creator-club?ref=009cad01267c4da0ac6862ad898ae902",194
"Trading Tribe","$1/month","https://www.skool.com/tradingtribe?ref=009cad01267c4da0ac6862ad898ae902",26800
"30 Day Challengers","Free","https://www.skool.com/30daychallengers?ref=009cad01267c4da0ac6862ad898ae902",127`;

// --- ADVANCED LANGUAGE DETECTION ENGINE ---
const detectLanguage = (name: string): { lang: string; flag: string } => {
  const n = name.toLowerCase();

  if (/[\u0600-\u06FF]/.test(name)) return { lang: "Arabic", flag: "🇸🇦" };
  if (/[\u0400-\u04FF]/.test(name)) return { lang: "Cyrillic", flag: "🌍" };
  if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(name))
    return { lang: "Asian Scripts", flag: "🌏" };
  if (/[\u0900-\u097F]/.test(name)) return { lang: "Hindi", flag: "🇮🇳" };

  if (
    /\b(el|los|las|comunidad|emprendedor|emprendedores|cimientos|empresariales|gemela|ia|negocio|aprende|aprender|dinero|ventas|éxito|exito|mujeres|curso|cursos|español|para|creadores|método|latino|inversión|inversiones|ingresos|libertad|desarrollo)\b/i.test(
      n,
    ) &&
    !/\b(the|and)\b/i.test(n)
  )
    return { lang: "Spanish", flag: "🇪🇸" };
  if (
    /\b(mit|und|struktur|ki|der|die|das|für|fuer|wie|ich|wir|erfolg|geld|unternehmen|akademie|gemeinschaft|verkauf|wissen|freiheit|lernen|schule|leben)\b/i.test(
      n,
    ) &&
    !/\b(the|and)\b/i.test(n)
  )
    return { lang: "German", flag: "🇩🇪" };
  if (
    /\b(le|les|incubateur|francais|français|pour|avec|dans|sur|entreprise|argent|communauté|académie|réussite|créateurs|liberté|revenus|investissement|vie)\b/i.test(
      n,
    ) &&
    !/\b(the|and)\b/i.test(n)
  )
    return { lang: "French", flag: "🇫🇷" };
  if (
    /\b(o|os|as|comunidade|seu|negócio|vendas|dinheiro|mercado|sucesso|criadores|renda|liberdade|brasil|mulheres)\b/i.test(
      n,
    ) &&
    !/\b(the|and)\b/i.test(n)
  )
    return { lang: "Portuguese", flag: "🇧🇷" };
  if (
    /\b(il|i|le|per|come|tuo|vendite|soldi|accademia|comunità|successo|vita|digitale)\b/i.test(
      n,
    ) &&
    !/\b(the|and)\b/i.test(n)
  )
    return { lang: "Italian", flag: "🇮🇹" };
  if (
    /\b(de|het|een|en|voor|met|bedrijf|succes|verkopen|naar|leven)\b/i.test(
      n,
    ) &&
    !/\b(the|and)\b/i.test(n)
  )
    return { lang: "Dutch", flag: "🇳🇱" };

  return { lang: "English", flag: "🇺🇸" };
};

// --- ROBUST DATA ENGINE ---
const parseCSVData = (csvText: string) => {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    if (char === '"' && csvText[i + 1] === '"') {
      currentCell += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && csvText[i + 1] === "\n") i++;
      currentRow.push(currentCell.trim());
      if (currentRow.some((c) => c !== "")) rows.push(currentRow);
      currentRow = [];
      currentCell = "";
    } else {
      currentCell += char;
    }
  }
  if (currentCell || currentRow.length) {
    currentRow.push(currentCell.trim());
    if (currentRow.some((c) => c !== "")) rows.push(currentRow);
  }

  const cleanRows = rows.filter(
    (row) => row.length > 1 && !row[0].trim().startsWith("#"),
  );

  if (cleanRows.length < 2) return [];

  const header = cleanRows[0].map((h) =>
    h.toLowerCase().replace(/[^a-z_ ]/g, ""),
  );
  let nameIdx = header.findIndex((h) => h.includes("name"));
  let priceIdx = header.findIndex((h) => h === "price" || h.includes("cost"));
  let urlIdx = header.findIndex((h) => h.includes("url") || h.includes("link"));
  let memberIdx = header.findIndex(
    (h) => h.includes("member") || h.includes("total"),
  );

  if (nameIdx === -1) nameIdx = 0;
  if (priceIdx === -1) priceIdx = 1;
  if (urlIdx === -1) urlIdx = 2;
  if (memberIdx === -1) memberIdx = 3;

  return cleanRows
    .slice(1)
    .map((row, index) => {
      if (row.length < 2) return null;

      const name = (row[nameIdx] || row[0] || "").replace(/^"|"$/g, "");
      const priceStrRaw = (row[priceIdx] || "").replace(/^"|"$/g, "");
      const url = (row[urlIdx] || "").replace(/^"|"$/g, "").trim();
      const memberStrRaw = (
        row[memberIdx] ||
        row[row.length - 1] ||
        ""
      ).replace(/^"|"$/g, "");

      const searchString = `${memberStrRaw} ${priceStrRaw} ${row.join(" ")}`;
      const memMatch =
        searchString.match(/(\d+\.?\d*)([kKmM]?)\s*[Mm]ember/i) ||
        searchString.match(/(\d+\.?\d*)([kKmM]?)/);

      let members = 0;
      if (memMatch) {
        members = Number.parseFloat(memMatch[1]);
        if (memMatch[2].toLowerCase() === "k") members *= 1000;
        if (memMatch[2].toLowerCase() === "m") members *= 1000000;
      }

      // Detect pricing type from raw price string
      // $X/month or $X/mo -> monthly
      // $X/year or $X/yr -> yearly
      // plain $X (no qualifier) -> fixed one-time
      // Free or $0 -> monthly (free)
      let ticketSize = 0;
      let yearlyPrice = 0;
      let fixedPrice = 0;
      let pricingType: "monthly" | "yearly" | "fixed" = "monthly";

      const priceSource = priceStrRaw || searchString;
      const isFreePrice =
        /free/i.test(priceSource) && !/\$[\d]/.test(priceSource);

      if (!isFreePrice) {
        const cleanPrice = priceSource.replace(/,/g, "");
        const pMatch = cleanPrice.match(/\$([\d.]+)/);
        if (pMatch) {
          const rawVal = Number.parseFloat(pMatch[1]);
          const hasMonth = /\/month|\/mo\b/i.test(priceSource);
          const hasYear = /\/year|\/yr\b/i.test(priceSource);

          if (hasYear) {
            pricingType = "yearly";
            yearlyPrice = rawVal;
            ticketSize = Math.round(rawVal / 12);
          } else if (hasMonth) {
            pricingType = "monthly";
            ticketSize = Math.round(rawVal);
          } else {
            // Plain $NNN with no /month or /year qualifier = fixed one-time
            pricingType = "fixed";
            fixedPrice = rawVal;
            ticketSize = 0; // no recurring revenue
          }
        }
      }

      members = Math.round(members);

      if (!name) return null;

      const tags: string[] = [];
      const lower = name.toLowerCase();
      if (
        lower.includes("business") ||
        lower.includes("founder") ||
        lower.includes("sales") ||
        lower.includes("revenue") ||
        lower.includes("agency")
      )
        tags.push("Business");
      if (
        lower.includes("fitness") ||
        lower.includes("health") ||
        lower.includes("wellness")
      )
        tags.push("Wellness");
      if (
        lower.includes("school") ||
        lower.includes("academy") ||
        lower.includes("mentor")
      )
        tags.push("Education");
      if (
        lower.includes("music") ||
        lower.includes("singer") ||
        lower.includes("piano")
      )
        tags.push("Arts");
      if (ticketSize === 0 && pricingType === "monthly") tags.push("Free");
      if (ticketSize >= 500 || yearlyPrice >= 500) tags.push("High-Ticket");
      if (tags.length === 0) tags.push("Community");

      const languageData = detectLanguage(name);
      const mrrVal =
        pricingType === "fixed" ? 0 : (members || 0) * (ticketSize || 0);

      return {
        id: `node-${index}-${Math.random().toString(36).substr(2, 4)}`,
        name: name,
        creatorName: "Network Node",
        members: members || 0,
        ticketSize: ticketSize || 0,
        mrr: mrrVal,
        tags: Array.from(new Set(tags)),
        language: languageData,
        url: url,
        pricingType,
        yearlyPrice,
        fixedPrice,
        sourceCategory: "",
      };
    })
    .filter(Boolean);
};

// --- NUMBER FORMATTING ---
const formatCurrency = (
  amount: number,
  currency: string,
  inrRate = 87,
): string => {
  if (!amount || amount === 0) return currency === "INR" ? "₹0" : "$0";
  if (currency === "INR") {
    const inr = amount * inrRate;
    if (inr >= 9950000)
      return `₹${(inr / 10000000).toFixed(2).replace(/\.00$/, "")}Cr`;
    if (inr >= 99500)
      return `₹${(inr / 100000).toFixed(2).replace(/\.00$/, "")}L`;
    if (inr >= 995) return `₹${(inr / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    return `₹${inr.toLocaleString()}`;
  }
  if (amount >= 995000)
    return `$${(amount / 1000000).toFixed(2).replace(/\.00$/, "")}M`;
  if (amount >= 995)
    return `$${(amount / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return `$${amount.toLocaleString()}`;
};

const compactNumber = (num: number): string => {
  if (!num || num === 0) return "0";
  if (num >= 995000)
    return `${(num / 1000000).toFixed(2).replace(/\.00$/, "")}M`;
  if (num >= 995) return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return num.toLocaleString();
};

function extractSlug(url: string): string {
  try {
    const m = url.match(/skool\.com\/([^/?#]+)/);
    return m ? m[1].toLowerCase().trim() : "";
  } catch {
    return "";
  }
}

function normalizeName(n: string): string {
  return n.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function dedupeByUrl(communities: Community[]): Community[] {
  const seen = new Set<string>();
  return communities.filter((c) => {
    const slug = extractSlug(c.url);
    if (!slug) return true;
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

function getColorForDelta(oldVal: number, newVal: number): string {
  if (oldVal === 0 && newVal === 0) return "rgb(255,255,255)";
  if (oldVal === 0) return "oklch(0.72 0.18 142)";
  const pct = (newVal - oldVal) / oldVal;
  if (Math.abs(pct) < 0.005) return "rgb(240,240,240)";

  const intensity = Math.min(Math.abs(pct), 1.0);
  const step = Math.ceil(intensity * 10);

  if (pct > 0) {
    const l = 0.88 - (step - 1) * 0.036;
    const c = 0.05 + (step - 1) * 0.015;
    return `oklch(${l.toFixed(3)} ${c.toFixed(3)} 142)`;
  }
  const l = 0.88 - (step - 1) * 0.036;
  const c = 0.05 + (step - 1) * 0.015;
  return `oklch(${l.toFixed(3)} ${c.toFixed(3)} 25)`;
}

// Helper: returns boxShadow + borderColor style for comparison card based on MRR delta (5-point scale)
function getMrrGlowStyle(
  decMrr: number,
  nowMrr: number,
): { boxShadow: string; borderColor: string } {
  if (decMrr === 0 && nowMrr === 0)
    return { boxShadow: "none", borderColor: "rgba(63,63,70,0.6)" };
  if (decMrr === 0 && nowMrr > 0)
    return {
      boxShadow:
        "inset 0 0 14px 0 rgba(34,197,94,0.18), 0 0 0 1px rgba(34,197,94,0.35)",
      borderColor: "rgba(34,197,94,0.4)",
    };
  const pct = (nowMrr - decMrr) / decMrr;
  if (Math.abs(pct) < 0.005)
    return { boxShadow: "none", borderColor: "rgba(63,63,70,0.6)" };
  const intensity = Math.min(Math.abs(pct), 1.0);
  const step = Math.ceil(intensity * 5); // 5-point scale
  if (pct > 0) {
    // green glow: alpha 0.06 → 0.28, border opacity 0.25 → 0.65
    const glowAlpha = (0.06 + (step - 1) * 0.055).toFixed(3);
    const borderAlpha = (0.25 + (step - 1) * 0.1).toFixed(3);
    return {
      boxShadow: `inset 0 0 ${8 + step * 4}px 0 rgba(34,197,94,${glowAlpha}), 0 0 0 1px rgba(34,197,94,${borderAlpha})`,
      borderColor: `rgba(34,197,94,${borderAlpha})`,
    };
  }
  // red glow
  const glowAlpha = (0.06 + (step - 1) * 0.055).toFixed(3);
  const borderAlpha = (0.25 + (step - 1) * 0.1).toFixed(3);
  return {
    boxShadow: `inset 0 0 ${8 + step * 4}px 0 rgba(239,68,68,${glowAlpha}), 0 0 0 1px rgba(239,68,68,${borderAlpha})`,
    borderColor: `rgba(239,68,68,${borderAlpha})`,
  };
}

// --- CENTRALIZED ENGINE CONFIGURATIONS ---
const REVENUE_TIERS = [
  {
    id: "emperor",
    min: 500000,
    label: "Emperor",
    desc: "$500k+",
    color: "text-red-500",
    glow: "drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]",
    bg: "bg-red-950/20",
    border: "border-red-900/50",
    icon: Crown,
  },
  {
    id: "whale",
    min: 100000,
    label: "Whale",
    desc: "$100k - $500k",
    color: "text-rose-400",
    glow: "drop-shadow-[0_0_8px_rgba(251,113,133,0.3)]",
    bg: "bg-rose-950/10",
    border: "border-rose-900/30",
    icon: Target,
  },
  {
    id: "pro",
    min: 25000,
    label: "Pro",
    desc: "$25k - $100k",
    color: "text-yellow-400",
    glow: "",
    bg: "bg-yellow-950/10",
    border: "border-yellow-900/30",
    icon: Rocket,
  },
  {
    id: "growth",
    min: 10000,
    label: "Growth",
    desc: "$10k - $25k",
    color: "text-lime-500",
    glow: "",
    bg: "bg-lime-950/10",
    border: "border-lime-900/30",
    icon: Sprout,
  },
  {
    id: "seed",
    min: 1000,
    label: "Seed",
    desc: "$1k - $10k",
    color: "text-fuchsia-300",
    glow: "",
    bg: "bg-fuchsia-950/10",
    border: "border-fuchsia-900/30",
    icon: Sparkles,
  },
  {
    id: "starter",
    min: 0,
    label: "Starter",
    desc: "< $1k",
    color: "text-zinc-400",
    glow: "",
    bg: "bg-transparent",
    border: "border-zinc-800",
    icon: CircleDot,
  },
];

const TICKET_TIERS = [
  {
    id: "EX",
    min: 1000,
    abbr: "EX",
    label: "Extreme",
    desc: "$1k+",
    bg: "bg-[#d8b4fe]",
    text: "text-[#3b0764]",
  },
  {
    id: "VH",
    min: 200,
    abbr: "VH",
    label: "Very High",
    desc: "$200 - $1k",
    bg: "bg-red-500",
    text: "text-white",
  },
  {
    id: "HIG",
    min: 100,
    abbr: "HIG",
    label: "High Ticket",
    desc: "$100 - $200",
    bg: "bg-orange-500",
    text: "text-white",
  },
  {
    id: "BIG",
    min: 50,
    abbr: "BIG",
    label: "Big",
    desc: "$50 - $100",
    bg: "bg-yellow-400",
    text: "text-yellow-950",
  },
  {
    id: "NM",
    min: 17,
    abbr: "NM",
    label: "Normal",
    desc: "$17 - $50",
    bg: "bg-emerald-500",
    text: "text-white",
  },
  {
    id: "CM",
    min: 0,
    abbr: "CM",
    label: "Common",
    desc: "< $17",
    bg: "bg-zinc-200",
    text: "text-zinc-600",
  },
];

const FREE_TIERS = [
  {
    id: "0-15k",
    label: "0 - 15k Members",
    color: "text-zinc-500",
    activeBg: "bg-zinc-800/60",
    activeText: "text-zinc-300",
  },
  {
    id: "15k-50k",
    label: "15k - 50k Members",
    color: "text-sky-500/70",
    activeBg: "bg-sky-500/10",
    activeText: "text-sky-300",
  },
  {
    id: "50k-100k",
    label: "50k - 100k Members",
    color: "text-teal-500/70",
    activeBg: "bg-teal-500/10",
    activeText: "text-teal-300",
  },
  {
    id: "100k-250k",
    label: "100k - 250k Members",
    color: "text-emerald-500/80",
    activeBg: "bg-emerald-500/10",
    activeText: "text-emerald-300",
  },
  {
    id: "250k+",
    label: "250k+ Members",
    color: "text-green-400",
    activeBg: "bg-green-500/15",
    activeText: "text-green-300",
  },
];

const getTierInfo = (exactRevenue: number) => {
  const roundedRev = Math.round(exactRevenue / 1000) * 1000;
  return REVENUE_TIERS.find((t) => roundedRev >= t.min) || REVENUE_TIERS[5];
};

const getTicketTierInfo = (price: number) => {
  return TICKET_TIERS.find((t) => price >= t.min) || TICKET_TIERS[5];
};

type Community = {
  id: string;
  name: string;
  creatorName: string;
  members: number;
  ticketSize: number;
  mrr: number;
  tags: string[];
  language: { lang: string; flag: string };
  url: string;
  pricingType: "monthly" | "yearly" | "fixed";
  yearlyPrice: number;
  fixedPrice: number;
  sourceCategory: string;
};

type EnrichedCommunity = Community & {
  activeRevenue: number;
  activeTicket: number;
};

// --- BASE64 DECODE HELPER ---
async function fetchAndDecodeCsv(url: string): Promise<Community[]> {
  const res = await fetch(url);
  let text = await res.text();
  text = text.trim();
  // Strip BOM if present
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  // Try base64 decode
  try {
    const decoded = atob(text);
    text = decoded;
  } catch {
    // Already plain text, use as-is
  }
  return dedupeByUrl(parseCSVData(text) as Community[]);
}

function decodeInlineCsv(rawCsv: string): Community[] {
  let text = rawCsv.trim();
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  try {
    const decoded = atob(text);
    text = decoded;
  } catch {
    // plain text
  }
  return dedupeByUrl(parseCSVData(text) as Community[]);
}

// --- MAIN APP ---
export default function App() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [activeCategory, setActiveCategory] = useState<
    | "discovery"
    | "music"
    | "selfimprovement"
    | "money"
    | "spirituality"
    | "tech"
    | "health"
    | "relationships"
    | "sports"
    | "hobbies"
    | "top500"
    | "megaall"
  >("megaall");
  const [isLoading, setIsLoading] = useState(false);
  const [inrRate, setInrRate] = useState(87);
  const [inrRateInput, setInrRateInput] = useState("87");
  const [hideNoMatch, setHideNoMatch] = useState(false);
  const [mrrDeltaFilter, setMrrDeltaFilter] = useState<
    "all" | "growth" | "declined"
  >("all");

  const discoveryData = useMemo(
    () => dedupeByUrl(decodeInlineCsv(DISCOVERY_CSV)),
    [],
  );

  const discoveryMap = useMemo(() => {
    const slugMap = new Map<string, Community>();
    const nameMap = new Map<string, Community>();
    for (const c of discoveryData) {
      const slug = extractSlug(c.url);
      if (slug) slugMap.set(slug, c);
      nameMap.set(normalizeName(c.name), c);
    }
    return { slugMap, nameMap };
  }, [discoveryData]);
  const [view, setView] = useState("gallery");
  const [currency, setCurrency] = useState("USD");
  const [isARR, setIsARR] = useState(false);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [mrrFilter, setMrrFilter] = useState("all");
  const [langFilter, setLangFilter] = useState("All");
  const [ticketFilter, setTicketFilter] = useState("All");
  const [sortBy, setSortBy] = useState("mrr");
  const [sortDir, setSortDir] = useState("desc");

  const [includeFreeThreshold, setIncludeFreeThreshold] = useState<
    number | null
  >(null);
  const [freeTierFilter, setFreeTierFilter] = useState("none");
  const [isFreeModalOpen, setIsFreeModalOpen] = useState(false);
  const [tempFreeThreshold, setTempFreeThreshold] = useState(0);
  const [showFixed, setShowFixed] = useState(false);
  const [showYearly, setShowYearly] = useState(false);

  const [isZenMode, setIsZenMode] = useState(false);
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    for (const c of communities) {
      for (const t of c.tags) {
        tags.add(t);
      }
    }
    return Array.from(tags).sort();
  }, [communities]);

  const uniqueLangs = useMemo(() => {
    const langs = new Set<string>();
    for (const c of communities) {
      if (c.language?.lang) langs.add(JSON.stringify(c.language));
    }
    return Array.from(langs)
      .map((l) => JSON.parse(l) as { lang: string; flag: string })
      .sort((a, b) => a.lang.localeCompare(b.lang));
  }, [communities]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: showFixed and showYearly are used in filter callbacks
  const filteredData = useMemo((): EnrichedCommunity[] => {
    const result = communities
      .filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.creatorName.toLowerCase().includes(search.toLowerCase()),
      )
      .filter(
        (c) => filterCategory === "All" || c.tags.includes(filterCategory),
      )
      .filter((c) => langFilter === "All" || c.language.lang === langFilter);

    let enriched: EnrichedCommunity[] = result.map((c) => ({
      ...c,
      activeRevenue: c.mrr * (isARR ? 12 : 1),
      activeTicket: c.ticketSize * (isARR ? 12 : 1),
    }));

    // Apply exclusive pricing type filter first
    enriched = enriched.filter((c) => {
      if (showFixed) return c.pricingType === "fixed";
      if (showYearly) return c.pricingType === "yearly";
      return c.pricingType === "monthly"; // default: only monthly
    });

    enriched = enriched.filter((c) => {
      // Free means pricingType=monthly AND ticketSize=0
      const isFree = c.pricingType === "monthly" && c.ticketSize === 0;
      // When pricing type filters are active, bypass free/paid logic
      if (showFixed || showYearly) return true;

      if (freeTierFilter !== "none") {
        if (!isFree) return false;
        if (freeTierFilter === "0-15k") return c.members <= 15000;
        if (freeTierFilter === "15k-50k")
          return c.members > 15000 && c.members <= 50000;
        if (freeTierFilter === "50k-100k")
          return c.members > 50000 && c.members <= 100000;
        if (freeTierFilter === "100k-250k")
          return c.members > 100000 && c.members <= 250000;
        if (freeTierFilter === "250k+") return c.members > 250000;
        return true;
      }

      if (isFree) {
        if (includeFreeThreshold === null) return false;
        if (c.members < includeFreeThreshold) return false;
      }

      if (mrrFilter !== "all") {
        const revTier = getTierInfo(c.activeRevenue);
        if (revTier.id !== mrrFilter) return false;
      }
      if (ticketFilter !== "All") {
        const tTier = getTicketTierInfo(c.ticketSize);
        if (tTier.id !== ticketFilter) return false;
      }
      return true;
    });

    enriched.sort((a, b) => {
      let valA = a.activeRevenue;
      let valB = b.activeRevenue;
      if (sortBy === "members") {
        valA = a.members;
        valB = b.members;
      } else if (sortBy === "arpu") {
        valA = a.activeTicket;
        valB = b.activeTicket;
      }

      if (valA < valB) return sortDir === "desc" ? 1 : -1;
      if (valA > valB) return sortDir === "desc" ? -1 : 1;
      return 0;
    });

    return enriched;
  }, [
    communities,
    search,
    filterCategory,
    langFilter,
    ticketFilter,
    mrrFilter,
    sortBy,
    sortDir,
    isARR,
    includeFreeThreshold,
    freeTierFilter,
    showFixed,
    showYearly,
  ]);

  const totalRev = useMemo(
    () => filteredData.reduce((acc, curr) => acc + curr.activeRevenue, 0),
    [filteredData],
  );
  const avgTicket = useMemo(() => {
    const paidData = filteredData.filter((d) => d.ticketSize > 0);
    return paidData.length
      ? Math.round(
          paidData.reduce((a, c) => a + c.activeTicket, 0) / paidData.length,
        )
      : 0;
  }, [filteredData]);

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const parsed = parseCSVData(e.target?.result as string) as Community[];
        if (parsed.length > 0) setCommunities(parsed);
        event.target.value = "";
      };
      reader.readAsText(file);
    },
    [],
  );

  const loadCategoryData = useCallback(
    async (
      cat:
        | "discovery"
        | "music"
        | "selfimprovement"
        | "money"
        | "spirituality"
        | "tech"
        | "health"
        | "relationships"
        | "sports"
        | "hobbies"
        | "top500"
        | "megaall",
    ): Promise<Community[]> => {
      const CSV_FILE_MAP: Record<string, string> = {
        selfimprovement:
          "/assets/skool_selfimprovement-019d5ccc-fc29-76fb-b3e3-aff27cf36f87.csv",
        money:
          "/assets/skool_money_1000_-_complete-019d5ccc-fc0a-74fb-9485-8724efc876d4.csv",
        spirituality:
          "/assets/skool_spirituality_complete-019d5ccc-fc2f-7762-80a1-4f5f6155a891.csv",
        tech: "/assets/skool_tech_1000_-complete-019d5ccc-fc44-751b-a104-a2ca165cc3e6.csv",
        health:
          "/assets/skool_health_complete-019d5ccc-fc97-70c8-8850-886b5deb1d20.csv",
        relationships:
          "/assets/skool_relationships-019d5ccc-fc99-717f-8d1d-ec088257a320.csv",
        sports:
          "/assets/skool_sports_complete-019d5ccc-fcd4-7398-804f-500ce2ecb2d9.csv",
        hobbies:
          "/assets/skool_hobbies_complete-019d5ccc-fca5-74dc-a679-3633e45ac44e.csv",
      };

      if (cat === "discovery") return decodeInlineCsv(DISCOVERY_CSV);
      if (cat === "music") return decodeInlineCsv(MUSIC_CSV);
      if (cat === "top500") return decodeInlineCsv(TOP500_CSV);

      const CAT_LABELS: Record<string, string> = {
        selfimprovement: "selfimprovement",
        money: "money",
        spirituality: "spirituality",
        tech: "tech",
        health: "health",
        relationships: "relationships",
        sports: "sports",
        hobbies: "hobbies",
      };

      if (cat === "megaall") {
        const discoveryItems = decodeInlineCsv(DISCOVERY_CSV).map((c) => ({
          ...c,
          sourceCategory: "discovery",
        }));
        const musicItems = decodeInlineCsv(MUSIC_CSV).map((c) => ({
          ...c,
          sourceCategory: "music",
        }));

        const fetchedArrays = await Promise.all(
          Object.entries(CSV_FILE_MAP).map(async ([catKey, fileUrl]) => {
            const items = await fetchAndDecodeCsv(fileUrl);
            return items.map((c) => ({
              ...c,
              sourceCategory: CAT_LABELS[catKey] || catKey,
            }));
          }),
        );
        const all = [...discoveryItems, ...musicItems, ...fetchedArrays.flat()];
        // Deduplicate by URL slug first, then by normalized name
        const seenSlugs = new Set<string>();
        const seenNames = new Set<string>();
        const deduped: Community[] = [];
        for (const c of all) {
          const slug = extractSlug(c.url);
          const nm = normalizeName(c.name);
          if (slug && seenSlugs.has(slug)) continue;
          if (!slug && seenNames.has(nm)) continue;
          if (slug) seenSlugs.add(slug);
          seenNames.add(nm);
          deduped.push(c);
        }
        return deduped;
      }

      // Fetched categories - all base64-encoded on disk
      const url = CSV_FILE_MAP[cat];
      return fetchAndDecodeCsv(url);
    },
    [],
  );

  const handleCategorySwitch = useCallback(
    async (
      cat:
        | "discovery"
        | "music"
        | "selfimprovement"
        | "money"
        | "spirituality"
        | "tech"
        | "health"
        | "relationships"
        | "sports"
        | "hobbies"
        | "top500"
        | "megaall",
    ) => {
      setActiveCategory(cat);
      setFilterCategory("All");
      setMrrFilter("all");
      setLangFilter("All");
      setTicketFilter("All");
      setFreeTierFilter("none");
      setSearch("");
      setShowFixed(false);
      setShowYearly(false);
      setIsLoading(true);
      try {
        const data = await loadCategoryData(cat);
        setCommunities(data);
      } finally {
        setIsLoading(false);
      }
    },
    [loadCategoryData],
  );

  const boundFormat = useCallback(
    (amount: number, currency: string) =>
      formatCurrency(amount, currency, inrRate),
    [inrRate],
  );

  const clearFilters = useCallback(() => {
    setSearch("");
    setFilterCategory("All");
    setLangFilter("All");
    setMrrFilter("all");
    setTicketFilter("All");
    setIncludeFreeThreshold(null);
    setFreeTierFilter("none");
  }, []);

  // Load Mega All on initial mount
  useEffect(() => {
    setIsLoading(true);
    loadCategoryData("megaall").then((data) => {
      setCommunities(data);
      setIsLoading(false);
    });
  }, [loadCategoryData]);

  // Debounced search handler
  const handleSearch = useCallback((val: string) => {
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => setSearch(val), 150);
  }, []);

  const handleZenMode = useCallback((status: boolean) => {
    setIsZenMode(status);
    if (status) setIsChatOpen(false);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#09090b] text-zinc-100 flex flex-col font-sans antialiased overflow-hidden">
      {isFreeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111] border border-zinc-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-scaleIn">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-bold text-white">
                Include Free Communities
              </h3>
              <button
                type="button"
                onClick={() => setIsFreeModalOpen(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mb-4">
              Include all $0 ticket communities with more than ____ members. (0
              includes all free communities)
            </p>
            <input
              type="number"
              value={tempFreeThreshold}
              onChange={(e) => setTempFreeThreshold(Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-zinc-700 focus:border-indigo-500 outline-none rounded-lg p-2.5 text-white text-sm mb-5 font-mono"
              placeholder="e.g. 10000"
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => {
                  setIncludeFreeThreshold(null);
                  setIsFreeModalOpen(false);
                }}
                className="px-4 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all duration-150 active:scale-95"
              >
                Disable Free
              </button>
              <button
                type="button"
                onClick={() => {
                  setIncludeFreeThreshold(tempFreeThreshold);
                  setFreeTierFilter("none");
                  setIsFreeModalOpen(false);
                }}
                className="px-5 py-2 bg-zinc-200 hover:bg-white text-black text-xs font-bold rounded-lg transition-all duration-150 active:scale-95"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {!isZenMode && (
        <header className="h-14 flex items-center gap-2 px-3 md:px-4 shrink-0 bg-[#09090b]/95 backdrop-blur-sm border-b border-zinc-800/60 z-20">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button
              type="button"
              onClick={() => setIsLeftOpen(!isLeftOpen)}
              className={`p-1.5 rounded-md motion-safe:transition-all duration-150 active:scale-95 hidden md:flex items-center justify-center min-w-[36px] min-h-[36px] ${isLeftOpen ? "bg-zinc-800 text-zinc-200" : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"}`}
            >
              {isLeftOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeft className="w-4 h-4" />
              )}
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-7 h-7 bg-white/90 text-zinc-900 rounded-[7px] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>

            {/* Category Switcher - icon-only by default, label appears when active */}
            <div
              className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800/60 rounded-full px-2 py-[3px] overflow-x-auto md:overflow-hidden shrink-0 scrollbar-hide"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {(
                [
                  {
                    id: "discovery",
                    Icon: Telescope,
                    label: "Discovery",
                    activeClass:
                      "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-violet-900/40",
                    iconColor: "text-violet-400",
                  },
                  {
                    id: "music",
                    Icon: Music2,
                    label: "Music",
                    activeClass:
                      "bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-pink-900/40",
                    iconColor: "text-pink-400",
                  },
                  {
                    id: "selfimprovement",
                    Icon: Brain,
                    label: "Self Improve",
                    activeClass:
                      "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-cyan-900/40",
                    iconColor: "text-cyan-400",
                  },
                  {
                    id: "money",
                    Icon: Banknote,
                    label: "Money",
                    activeClass:
                      "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-emerald-900/40",
                    iconColor: "text-emerald-400",
                  },
                  {
                    id: "spirituality",
                    Icon: Sun,
                    label: "Spirituality",
                    activeClass:
                      "bg-gradient-to-r from-amber-500 to-yellow-400 text-white shadow-amber-900/40",
                    iconColor: "text-amber-400",
                  },
                  {
                    id: "tech",
                    Icon: Cpu,
                    label: "Tech",
                    activeClass:
                      "bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-blue-900/40",
                    iconColor: "text-blue-400",
                  },
                  {
                    id: "health",
                    Icon: Activity,
                    label: "Health",
                    activeClass:
                      "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-red-900/40",
                    iconColor: "text-red-400",
                  },
                  {
                    id: "relationships",
                    Icon: HeartHandshake,
                    label: "Relations",
                    activeClass:
                      "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-rose-900/40",
                    iconColor: "text-rose-400",
                  },
                  {
                    id: "sports",
                    Icon: Dumbbell,
                    label: "Sports",
                    activeClass:
                      "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-900/40",
                    iconColor: "text-orange-400",
                  },
                  {
                    id: "hobbies",
                    Icon: Wand2,
                    label: "Hobbies",
                    activeClass:
                      "bg-gradient-to-r from-purple-500 to-violet-500 text-white shadow-purple-900/40",
                    iconColor: "text-purple-400",
                  },
                ] as const
              ).map(({ id, Icon, label, activeClass, iconColor }) => {
                const isActive = activeCategory === id;
                return (
                  <button
                    key={id}
                    type="button"
                    data-ocid={`category.${id}.tab`}
                    onClick={() =>
                      handleCategorySwitch(
                        id as Parameters<typeof handleCategorySwitch>[0],
                      )
                    }
                    title={label}
                    className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 active:scale-95 shrink-0 ${isActive ? `${activeClass} shadow-md` : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/80"}`}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : iconColor}`}
                      strokeWidth={2}
                    />
                    <span
                      style={{
                        maxWidth: isActive ? "60px" : "0px",
                        opacity: isActive ? 1 : 0,
                        overflow: "hidden",
                        transition:
                          "max-width 0.18s cubic-bezier(0.4,0,0.2,1), opacity 0.12s ease",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                      }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}

              {/* Divider */}
              <div className="w-px h-5 bg-zinc-700/60 mx-0.5 shrink-0" />

              {/* Top 500 */}
              {(() => {
                const isActive = activeCategory === "top500";
                return (
                  <button
                    key="top500"
                    type="button"
                    data-ocid="category.top500.tab"
                    onClick={() =>
                      handleCategorySwitch(isActive ? "discovery" : "top500")
                    }
                    title="Top 500"
                    className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 active:scale-95 shrink-0 ${isActive ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-white shadow-md shadow-amber-900/40" : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/80"}`}
                  >
                    <Trophy
                      className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-amber-500"}`}
                      strokeWidth={2}
                    />
                    <span
                      style={{
                        maxWidth: isActive ? "50px" : "0px",
                        opacity: isActive ? 1 : 0,
                        overflow: "hidden",
                        transition:
                          "max-width 0.18s cubic-bezier(0.4,0,0.2,1), opacity 0.12s ease",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                      }}
                    >
                      Top 500
                    </span>
                  </button>
                );
              })()}

              {/* Mega All */}
              {(() => {
                const isActive = activeCategory === "megaall";
                return (
                  <button
                    key="megaall"
                    type="button"
                    data-ocid="category.megaall.tab"
                    onClick={() =>
                      handleCategorySwitch(isActive ? "discovery" : "megaall")
                    }
                    title="Mega All"
                    className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 active:scale-95 shrink-0 ${isActive ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-900/40" : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/80"}`}
                  >
                    <Layers
                      className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-indigo-400"}`}
                      strokeWidth={2}
                    />
                    <span
                      style={{
                        maxWidth: isActive ? "55px" : "0px",
                        opacity: isActive ? 1 : 0,
                        overflow: "hidden",
                        transition:
                          "max-width 0.18s cubic-bezier(0.4,0,0.2,1), opacity 0.12s ease",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                      }}
                    >
                      Mega All
                    </span>
                  </button>
                );
              })()}
            </div>

            <div className="relative flex items-center">
              <Search className="absolute left-2.5 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-24 sm:w-32 bg-zinc-900/80 border border-zinc-800/80 rounded-full py-1.5 pl-7 pr-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 focus:bg-zinc-900 focus:w-32 sm:focus:w-40 motion-safe:transition-all duration-200 min-h-[36px]"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 text-zinc-500 hover:text-zinc-300"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleZenMode(true)}
              className="p-1.5 rounded-md transition-all duration-150 bg-transparent border-transparent text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 active:scale-95"
              title="Focus Mode"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Mobile filter button */}
            <button
              type="button"
              data-ocid="mobile.filter.button"
              onClick={() => setMobileFilterOpen(true)}
              className="flex md:hidden p-1.5 rounded-md transition-all duration-150 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 active:scale-95 min-w-[36px] min-h-[36px] items-center justify-center"
              title="Filters"
            >
              <Filter className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className={`hidden md:flex p-1.5 rounded-md transition-all duration-150 border active:scale-95 ${isFiltersOpen ? "bg-zinc-800 border-zinc-700 text-zinc-200" : "bg-transparent border-transparent text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"}`}
              title="Toggle Advanced Filters"
            >
              {isFiltersOpen ? (
                <FilterX className="w-4 h-4" />
              ) : (
                <Filter className="w-4 h-4" />
              )}
            </button>

            <div className="h-4 w-px bg-zinc-800 mx-1 hidden sm:block" />

            <div className="hidden sm:flex bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
              <button
                type="button"
                onClick={() => setIsARR(false)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-sm transition-all duration-150 active:scale-95 ${!isARR ? "bg-zinc-700 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                MRR
              </button>
              <button
                type="button"
                onClick={() => setIsARR(true)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-sm transition-all duration-150 active:scale-95 ${isARR ? "bg-zinc-700 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                ARR
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCurrency(currency === "USD" ? "INR" : "USD")}
                className="text-xs font-bold text-zinc-400 hover:text-zinc-200 transition-all duration-150 active:scale-95 flex items-center gap-1 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-md"
              >
                {currency === "USD" ? (
                  <DollarSign className="w-3.5 h-3.5" />
                ) : (
                  <IndianRupee className="w-3.5 h-3.5" />
                )}
              </button>
              {currency === "INR" && (
                <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-md overflow-hidden">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={inrRateInput}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, "");
                      setInrRateInput(raw);
                      const parsed = Number.parseInt(raw, 10);
                      if (parsed >= 1) setInrRate(parsed);
                    }}
                    onBlur={() => {
                      const parsed = Number.parseInt(inrRateInput, 10);
                      const valid = parsed >= 1 ? parsed : 87;
                      setInrRate(valid);
                      setInrRateInput(String(valid));
                    }}
                    className="w-14 bg-transparent text-[11px] font-bold text-amber-400 px-1.5 py-1 focus:outline-none text-center"
                    title="INR exchange rate"
                  />
                  <span className="text-[9px] text-zinc-500 pr-1.5 font-bold">
                    ₹/$
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`hidden lg:flex p-1.5 rounded-md transition-all duration-150 border active:scale-95 ${isChatOpen ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400" : "bg-transparent border-transparent text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"}`}
              title="AI Copilot"
            >
              <Bot className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsRightOpen(!isRightOpen)}
              className={`p-1.5 rounded-md transition-all duration-150 active:scale-95 ${isRightOpen ? "bg-zinc-800 text-zinc-200" : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"}`}
            >
              {isRightOpen ? (
                <PanelRightClose className="w-4 h-4" />
              ) : (
                <PanelRight className="w-4 h-4" />
              )}
            </button>
          </div>
        </header>
      )}

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile sidebar overlay */}
        {mobileFilterOpen && (
          <div
            className="fixed inset-0 z-50 md:hidden"
            data-ocid="mobile.filter.modal"
          >
            <button
              type="button"
              aria-label="Close filters"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm w-full h-full"
              onClick={() => setMobileFilterOpen(false)}
            />
            <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-[#09090b] border-r border-zinc-800/80 flex flex-col overflow-y-auto custom-scrollbar z-10 translate-x-0 motion-safe:transition-transform motion-safe:duration-200">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 shrink-0">
                <span className="text-sm font-bold text-zinc-200">Filters</span>
                <button
                  type="button"
                  data-ocid="mobile.filter.close_button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 active:scale-95 min-w-[36px] min-h-[36px] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="w-[280px] flex flex-col flex-1">
                <div className="p-3 space-y-1 mt-2 pt-2">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em] px-3 py-2">
                    Workspace
                  </div>
                  {[
                    { id: "gallery", icon: LayoutGrid, label: "Cards View" },
                    { id: "table", icon: Table2, label: "Data Ledger" },
                    { id: "analytics", icon: BarChart3, label: "Observatory" },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => {
                        setView(item.id);
                        setMobileFilterOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg motion-safe:transition-all duration-150 text-sm font-medium active:scale-95 min-h-[44px] ${view === item.id ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"}`}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        )}

        {!isZenMode && (
          <aside
            className={`border-r border-zinc-800/80 bg-[#09090b] hidden md:flex flex-col shrink-0 overflow-x-hidden overflow-y-auto custom-scrollbar transform-gpu motion-safe:transition-all duration-200 ${isLeftOpen ? "w-[230px] opacity-100" : "w-0 opacity-0 border-none"}`}
          >
            <div className="w-[230px] flex flex-col min-h-full">
              <div className="p-3 space-y-1 mt-2 pt-2">
                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em] px-3 py-2">
                  Workspace
                </div>
                {[
                  { id: "gallery", icon: LayoutGrid, label: "Cards View" },
                  { id: "table", icon: Table2, label: "Data Ledger" },
                  { id: "analytics", icon: BarChart3, label: "Observatory" },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setView(item.id)}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-150 text-sm font-medium active:scale-95 ${view === item.id ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"}`}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Pricing Type Section */}
              <div className="p-3 space-y-1 mt-2 border-t border-zinc-800/50 pt-4">
                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em] px-3 pb-2">
                  Pricing Type
                </div>
                <button
                  type="button"
                  data-ocid="pricing.fixed.toggle"
                  onClick={() => {
                    setShowFixed((v) => !v);
                    setShowYearly(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-150 text-sm font-medium active:scale-95 ${showFixed ? "bg-amber-500/20 text-amber-400 border-l-2 border-l-amber-500 border border-amber-500/30" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"}`}
                >
                  <span className="text-base">🏷️</span>
                  <span className="text-[12px] font-bold">
                    One-Time / Fixed
                  </span>
                  {showFixed && (
                    <span className="ml-auto text-[9px] font-bold bg-amber-500/30 text-amber-300 px-1.5 py-0.5 rounded-full">
                      ON
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  data-ocid="pricing.yearly.toggle"
                  onClick={() => {
                    setShowYearly((v) => !v);
                    setShowFixed(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-150 text-sm font-medium active:scale-95 ${showYearly ? "bg-sky-500/20 text-sky-400 border-l-2 border-l-sky-500 border border-sky-500/30" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"}`}
                >
                  <span className="text-base">📅</span>
                  <span className="text-[12px] font-bold">
                    Yearly Memberships
                  </span>
                  {showYearly && (
                    <span className="ml-auto text-[9px] font-bold bg-sky-500/30 text-sky-300 px-1.5 py-0.5 rounded-full">
                      ON
                    </span>
                  )}
                </button>
              </div>

              <div className="p-3 space-y-1 mt-2 border-t border-zinc-800/50 pt-4">
                <div className="flex justify-between items-center px-3 pb-2">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em]">
                    Pipeline Tiers
                  </div>
                  {mrrFilter !== "all" && (
                    <button
                      type="button"
                      onClick={() => setMrrFilter("all")}
                      className="text-[9px] text-zinc-400 hover:text-white uppercase font-bold tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setMrrFilter("all")}
                  className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-150 text-left active:scale-95 ${mrrFilter === "all" ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  <div className="w-3.5 h-3.5 rounded-sm bg-zinc-700 flex items-center justify-center text-[8px] font-black shrink-0 text-white">
                    ALL
                  </div>
                  <span className="text-[12px] font-bold">All Pipeline</span>
                </button>

                {REVENUE_TIERS.map((tier) => (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => {
                      setMrrFilter(tier.id);
                      setFreeTierFilter("none");
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-150 text-left active:scale-95 ${mrrFilter === tier.id ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                  >
                    <tier.icon
                      className={`w-3.5 h-3.5 shrink-0 ${tier.color}`}
                    />
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold leading-tight">
                        {tier.label}
                      </span>
                      <span className="text-[9px] font-medium text-zinc-600 leading-tight mt-0.5">
                        {tier.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3 space-y-1 border-t border-zinc-800/50 pt-4 mb-4">
                <div className="flex justify-between items-center px-3 pb-2">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em]">
                    Ticket Size
                  </div>
                  {ticketFilter !== "All" && (
                    <button
                      type="button"
                      onClick={() => setTicketFilter("All")}
                      className="text-[9px] text-zinc-400 hover:text-white uppercase font-bold tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setTicketFilter("All")}
                  className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-150 text-left active:scale-95 ${ticketFilter === "All" ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  <div className="w-6 h-4 rounded bg-zinc-700 text-white text-[7px] flex items-center justify-center font-black shrink-0">
                    ALL
                  </div>
                  <span className="text-[12px] font-bold">All Tickets</span>
                </button>

                {TICKET_TIERS.map((tier) => (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => {
                      setTicketFilter(tier.id);
                      setFreeTierFilter("none");
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-150 text-left active:scale-95 ${ticketFilter === tier.id ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                  >
                    <div
                      className={`w-6 h-4 rounded ${tier.bg} ${tier.text} text-[7px] flex items-center justify-center font-black shrink-0 shadow-sm`}
                    >
                      {tier.abbr}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold leading-tight">
                        {tier.label}
                      </span>
                      <span className="text-[9px] font-medium text-zinc-600 leading-tight mt-0.5">
                        {tier.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3 space-y-1 border-t border-zinc-800/50 pt-4">
                <div className="flex justify-between items-start px-3 pb-2">
                  <div className="flex flex-col">
                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                      Free Only View
                    </div>
                    <span className="text-[8px] text-zinc-500 font-medium leading-tight mt-0.5">
                      (Only Free Shown)
                    </span>
                  </div>
                  {freeTierFilter !== "none" && (
                    <button
                      type="button"
                      onClick={() => {
                        setFreeTierFilter("none");
                        setIncludeFreeThreshold(null);
                      }}
                      className="text-[9px] text-indigo-400 hover:text-indigo-300 uppercase font-bold tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFreeTierFilter("all");
                    setMrrFilter("all");
                    setTicketFilter("All");
                  }}
                  className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-150 text-left active:scale-95 ${freeTierFilter === "all" ? "bg-indigo-500/20 text-indigo-300" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  <span className="text-[12px] font-bold">
                    All Free Communities
                  </span>
                </button>

                {FREE_TIERS.map((tier) => (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => {
                      setFreeTierFilter(tier.id);
                      setMrrFilter("all");
                      setTicketFilter("All");
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-150 text-left active:scale-95 ${
                      freeTierFilter === tier.id
                        ? `${tier.activeBg} ${tier.activeText}`
                        : `${tier.color} hover:bg-zinc-900`
                    }`}
                  >
                    <span className="text-[12px] font-bold leading-tight">
                      {tier.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="p-3 space-y-1 mt-2 border-t border-zinc-800/50 pt-4">
                <div className="flex justify-between items-center px-3 pb-2">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.12em]">
                    Region
                  </div>
                  {langFilter !== "All" && (
                    <button
                      type="button"
                      onClick={() => setLangFilter("All")}
                      className="text-[9px] text-zinc-400 hover:text-white uppercase font-bold tracking-wider"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setLangFilter("All")}
                  className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-150 text-left active:scale-95 ${langFilter === "All" ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                >
                  <div className="w-6 h-4 rounded bg-zinc-700 text-white text-[7px] flex items-center justify-center font-black shrink-0">
                    ALL
                  </div>
                  <span className="text-[12px] font-bold">All Regions</span>
                </button>

                {uniqueLangs.map((l) => (
                  <button
                    type="button"
                    key={l.lang}
                    onClick={() => setLangFilter(l.lang)}
                    className={`flex items-center gap-3 w-full px-3 py-1.5 rounded-lg transition-all duration-150 text-left active:scale-95 ${langFilter === l.lang ? "bg-zinc-800 text-zinc-100" : "text-zinc-400 hover:bg-zinc-900"}`}
                  >
                    <div className="text-base shrink-0">{l.flag}</div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold leading-tight">
                        {l.lang}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-4 mt-auto border-t border-zinc-800/50">
                <input
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 w-full py-2 bg-zinc-100 text-zinc-900 rounded-lg text-xs font-bold hover:bg-white transition-all duration-150 active:scale-95"
                >
                  <Upload className="w-3.5 h-3.5" /> Import CSV
                </button>
              </div>
            </div>
          </aside>
        )}

        <main className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a]">
          {!isZenMode && (
            <div
              className={`overflow-hidden transition-all duration-200 ease-in-out shrink-0 border-b border-zinc-800/50 bg-[#0a0a0a] ${
                isFiltersOpen
                  ? "max-h-32 opacity-100 py-2"
                  : "max-h-0 opacity-0 pointer-events-none border-none"
              }`}
            >
              <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between px-4">
                <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1 lg:pb-0">
                  {["All", ...uniqueTags].map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => setFilterCategory(tag)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 border ${
                        filterCategory === tag
                          ? "bg-zinc-200 text-zinc-900 border-zinc-200"
                          : "bg-transparent border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 lg:pb-0 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsFreeModalOpen(true)}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold border transition-colors ${
                      includeFreeThreshold !== null || freeTierFilter !== "none"
                        ? "bg-indigo-500/10 border-indigo-500/50 text-indigo-400"
                        : "bg-transparent border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {includeFreeThreshold !== null ||
                    freeTierFilter !== "none" ? (
                      <Eye className="w-3 h-3" />
                    ) : (
                      <EyeOff className="w-3 h-3" />
                    )}
                    {includeFreeThreshold !== null
                      ? `Free (>${compactNumber(includeFreeThreshold)})`
                      : freeTierFilter !== "none"
                        ? "Free Only View"
                        : "+ Include Free"}
                  </button>

                  <div className="w-px h-4 bg-zinc-800 mx-1" />

                  <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
                    <Tag className="w-3 h-3 text-zinc-500 ml-1.5" />
                    <select
                      value={ticketFilter}
                      onChange={(e) => {
                        setTicketFilter(e.target.value);
                        setFreeTierFilter("none");
                      }}
                      className="bg-zinc-900 text-zinc-300 text-[10px] font-bold border-none focus:ring-0 px-1 py-1 outline-none cursor-pointer"
                    >
                      <option value="All">All Tickets</option>
                      {TICKET_TIERS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label} ({t.desc})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
                    <SlidersHorizontal className="w-3 h-3 text-zinc-500 ml-1.5" />
                    <select
                      value={mrrFilter}
                      onChange={(e) => {
                        setMrrFilter(e.target.value);
                        setFreeTierFilter("none");
                      }}
                      className="bg-zinc-900 text-zinc-300 text-[10px] font-bold border-none focus:ring-0 px-1 py-1 outline-none cursor-pointer"
                    >
                      <option value="all">All Pipeline</option>
                      {REVENUE_TIERS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.label} ({t.desc})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
                    <ArrowUpDown className="w-3 h-3 text-zinc-500 ml-1.5" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-zinc-900 text-zinc-300 text-[10px] font-bold border-none focus:ring-0 px-1 py-1 outline-none cursor-pointer"
                    >
                      <option value="mrr">Revenue</option>
                      <option value="members">Members</option>
                      <option value="arpu">Ticket</option>
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        setSortDir((d) => (d === "desc" ? "asc" : "desc"))
                      }
                      className="p-1 rounded hover:bg-zinc-800 text-zinc-400 transition-colors"
                    >
                      {sortDir === "desc" ? (
                        <ArrowDown className="w-3 h-3" />
                      ) : (
                        <ArrowUp className="w-3 h-3" />
                      )}
                    </button>
                  </div>

                  <div className="w-px h-4 bg-zinc-800 mx-1" />

                  <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-md p-0.5">
                    <Globe className="w-3 h-3 text-indigo-400 ml-1.5" />
                    {langFilter !== "All" && (
                      <span className="text-[12px] leading-none ml-0.5">
                        {uniqueLangs.find((l) => l.lang === langFilter)?.flag}
                      </span>
                    )}
                    <select
                      value={langFilter}
                      onChange={(e) => setLangFilter(e.target.value)}
                      className="bg-zinc-900 text-indigo-300 text-[10px] font-bold border-none focus:ring-0 px-1 py-1 outline-none cursor-pointer"
                    >
                      <option value="All">🌐 All Regions</option>
                      {uniqueLangs.map((l) => (
                        <option key={l.lang} value={l.lang}>
                          {l.flag} {l.lang}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-3 md:p-4 lg:p-6 pb-4 md:pb-6 custom-scrollbar bg-[#0a0a0a] relative">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="w-8 h-8 border-2 border-zinc-700 border-t-violet-500 rounded-full animate-spin" />
                <div className="text-zinc-500 text-sm font-medium">
                  Loading dataset...
                </div>
              </div>
            ) : filteredData.length === 0 ? (
              <EmptyState onReset={clearFilters} />
            ) : (
              <>
                {view === "gallery" && (
                  <>
                    {activeCategory === "top500" && (
                      <div className="flex items-center flex-wrap gap-2 mb-4">
                        <button
                          type="button"
                          onClick={() => setHideNoMatch((v) => !v)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 active:scale-95 ${hideNoMatch ? "bg-amber-500/20 border-amber-500/40 text-amber-400" : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}
                        >
                          {hideNoMatch
                            ? "⚡ Comparisons only"
                            : "⚡ Show comparisons only"}
                        </button>
                        <div className="w-px h-4 bg-zinc-800 self-center" />
                        <button
                          type="button"
                          onClick={() =>
                            setMrrDeltaFilter((v) =>
                              v === "growth" ? "all" : "growth",
                            )
                          }
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 active:scale-95 ${mrrDeltaFilter === "growth" ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400" : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}
                        >
                          ↑ MRR Growth
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setMrrDeltaFilter((v) =>
                              v === "declined" ? "all" : "declined",
                            )
                          }
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 active:scale-95 ${mrrDeltaFilter === "declined" ? "bg-rose-500/15 border-rose-500/40 text-rose-400" : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200"}`}
                        >
                          ↓ MRR Declined
                        </button>
                      </div>
                    )}
                    <MinimalCardsView
                      data={filteredData}
                      currency={currency}
                      format={boundFormat}
                      isARR={isARR}
                      discoveryMap={
                        activeCategory === "top500" ? discoveryMap : undefined
                      }
                      hideNoMatch={
                        activeCategory === "top500" ? hideNoMatch : false
                      }
                      mrrDeltaFilter={
                        activeCategory === "top500" ? mrrDeltaFilter : "all"
                      }
                      isMegaAll={activeCategory === "megaall"}
                    />
                  </>
                )}
                {view === "table" && (
                  <LedgerView
                    data={filteredData}
                    currency={currency}
                    format={boundFormat}
                    isARR={isARR}
                    discoveryMap={
                      activeCategory === "top500" ? discoveryMap : undefined
                    }
                    isTop500={activeCategory === "top500"}
                  />
                )}
                {view === "analytics" && (
                  <ObservatoryView
                    data={filteredData}
                    currency={currency}
                    format={boundFormat}
                    isARR={isARR}
                    totalRev={totalRev}
                  />
                )}
              </>
            )}
          </div>
        </main>

        {!isZenMode && (
          <aside
            className={`border-l border-zinc-800/80 bg-[#09090b] flex flex-col shrink-0 overflow-x-hidden overflow-y-auto custom-scrollbar transform-gpu motion-safe:transition-all duration-200 ${isRightOpen ? "w-64 opacity-100" : "w-0 opacity-0 border-none"}`}
          >
            <div className="w-64 flex flex-col min-h-full">
              <div className="p-4 border-b border-zinc-800/80">
                <h3 className="text-xs font-semibold text-zinc-100 flex items-center gap-2">
                  Global Insights
                </h3>
              </div>
              <div className="p-4 space-y-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-1">
                      Total Pipeline
                    </div>
                    <div className="text-2xl font-black text-zinc-100 tracking-tighter">
                      {boundFormat(totalRev, currency)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-1">
                        Avg Ticket
                      </div>
                      <div className="text-sm font-semibold text-zinc-300">
                        ${compactNumber(avgTicket)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-1">
                        Nodes
                      </div>
                      <div className="text-sm font-semibold text-zinc-300">
                        {filteredData.length}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/50">
                  <div className="text-[10px] uppercase text-zinc-500 font-bold tracking-wider mb-3">
                    Revenue Tiers
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        label: "Whale",
                        count: filteredData.filter((d) => d.mrr >= 100000)
                          .length,
                        color: "bg-rose-500",
                      },
                      {
                        label: "Pro",
                        count: filteredData.filter(
                          (d) => d.mrr >= 25000 && d.mrr < 100000,
                        ).length,
                        color: "bg-yellow-500",
                      },
                      {
                        label: "Growth",
                        count: filteredData.filter(
                          (d) => d.mrr >= 10000 && d.mrr < 25000,
                        ).length,
                        color: "bg-lime-500",
                      },
                      {
                        label: "Seed",
                        count: filteredData.filter(
                          (d) => d.mrr >= 1000 && d.mrr < 10000,
                        ).length,
                        color: "bg-fuchsia-400",
                      },
                    ].map((t) => (
                      <div key={t.label}>
                        <div className="flex justify-between text-[11px] mb-1.5">
                          <span className="text-zinc-400">{t.label}</span>
                          <span className="text-zinc-200 font-mono">
                            {t.count}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${t.color} transition-all duration-500 ease-out`}
                            style={{
                              width: `${filteredData.length ? (t.count / filteredData.length) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}

        {isChatOpen && (
          <div className="absolute top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] border-l border-zinc-800 shadow-2xl z-50 flex flex-col">
            <AICopilot
              data={filteredData}
              currency={currency}
              format={boundFormat}
              isARR={isARR}
              onClose={() => setIsChatOpen(false)}
            />
          </div>
        )}
      </div>

      {/* Mobile bottom nav bar - only shown on mobile, not in zen mode */}
      {!isZenMode && (
        <nav className="flex md:hidden shrink-0 items-center justify-around bg-[#09090b]/98 backdrop-blur-sm border-t border-zinc-800/60 px-2 py-1 pb-safe z-30">
          {[
            { id: "gallery", Icon: LayoutGrid, label: "Cards" },
            { id: "table", Icon: Table2, label: "Ledger" },
            { id: "analytics", Icon: BarChart3, label: "Charts" },
          ].map(({ id, Icon, label }) => (
            <button
              key={id}
              type="button"
              data-ocid={`mobile.view.${id}.tab`}
              onClick={() => setView(id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl min-w-[56px] min-h-[44px] motion-safe:transition-all duration-150 active:scale-95 ${view === id ? "text-white bg-zinc-800" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{label}</span>
            </button>
          ))}
          <button
            type="button"
            data-ocid="mobile.filter.open_modal_button"
            onClick={() => setMobileFilterOpen(true)}
            className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl min-w-[56px] min-h-[44px] motion-safe:transition-all duration-150 active:scale-95 text-zinc-500 hover:text-zinc-300"
          >
            <Filter className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Filters</span>
          </button>
        </nav>
      )}

      {isZenMode && (
        <button
          type="button"
          onClick={() => handleZenMode(false)}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-xs font-bold shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform"
        >
          <Minimize2 className="w-4 h-4" /> Exit Focus
        </button>
      )}
    </div>
  );
}

// --- SUBVIEWS ---

function Top500ComparisonCard({
  community,
  match,
  currency,
  format,
  index,
}: {
  community: EnrichedCommunity;
  match: Community;
  currency: string;
  format: (a: number, c: string) => string;
  index: number;
}) {
  const ticketTier = getTicketTierInfo(community.ticketSize);

  const decMembers = community.members;
  const decTicket = community.ticketSize;
  const decMrr = community.mrr;

  const nowMembers = match.members;
  const nowTicket = match.ticketSize;
  const nowMrr = match.mrr;

  const DEC_2025 = new Date(2025, 11, 1);
  const NOW = new Date(2026, 3, 3);
  const monthsElapsed =
    (NOW.getTime() - DEC_2025.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
  const mrrSlope = (nowMrr - decMrr) / monthsElapsed;
  const sparkData = [
    { t: 0, v: decMrr },
    { t: monthsElapsed, v: nowMrr },
  ];

  const membersColor = getColorForDelta(decMembers, nowMembers);
  const ticketColor = getColorForDelta(decTicket, nowTicket);
  const mrrColor = getColorForDelta(decMrr, nowMrr);
  const glowStyle = getMrrGlowStyle(decMrr, nowMrr);

  return (
    <button
      type="button"
      onClick={() => community.url && window.open(community.url, "_blank")}
      style={{
        animationDelay: `${Math.min(index, 20) * 30}ms`,
        boxShadow: glowStyle.boxShadow,
        borderColor: glowStyle.borderColor,
      }}
      className={`group relative flex flex-col p-4 bg-[#0a0a0a] hover:bg-[#111] border transition-all duration-150 rounded-xl w-full text-left motion-safe:animate-fadeInUp motion-safe:hover:scale-[1.012] motion-safe:hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 will-change-transform [contain:layout_style_paint] ${community.url ? "cursor-pointer" : ""}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 min-w-0 mb-3">
        <div
          className={`w-7 h-7 shrink-0 rounded-md flex items-center justify-center ${ticketTier.bg} ${ticketTier.text} text-[9px] font-black shadow-sm`}
        >
          {ticketTier.abbr}
        </div>
        <h4 className="text-sm font-bold text-zinc-100 truncate tracking-tight group-hover:text-white transition-colors flex-1 min-w-0">
          {community.name}
        </h4>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-2 gap-2 mb-1.5">
        <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
          Dec &apos;25
        </div>
        <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
          Now
        </div>
      </div>

      {/* Members row */}
      <div className="grid grid-cols-2 gap-2 mb-1">
        <div className="flex items-center gap-1 text-[11px] text-zinc-500">
          <Users className="w-3 h-3 shrink-0" />
          {compactNumber(decMembers)}
        </div>
        <div className="text-[11px] font-bold" style={{ color: membersColor }}>
          {compactNumber(nowMembers)}
        </div>
      </div>

      {/* Ticket row */}
      <div className="grid grid-cols-2 gap-2 mb-1">
        <div className="text-[11px] text-zinc-500">
          {decTicket === 0 ? "Free" : `$${compactNumber(decTicket)}/m`}
        </div>
        <div className="text-[11px] font-bold" style={{ color: ticketColor }}>
          {nowTicket === 0 ? "Free" : `$${compactNumber(nowTicket)}/m`}
        </div>
      </div>

      {/* MRR row */}
      <div className="grid grid-cols-2 gap-2 items-center mt-1">
        <div className="text-[11px] text-zinc-500">
          {format(decMrr, currency)}
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="text-[13px] font-black tracking-tight"
            style={{ color: mrrColor }}
          >
            {format(nowMrr, currency)}
          </span>
        </div>
      </div>

      {/* MRR Sparkline — delta line only */}
      {(decMrr > 0 || nowMrr > 0) && (
        <div className="mt-2 h-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={sparkData}
              margin={{ top: 2, right: 4, bottom: 2, left: 4 }}
            >
              <Line
                type="monotone"
                dataKey="v"
                stroke={
                  nowMrr >= decMrr
                    ? "oklch(0.68 0.15 142)"
                    : "oklch(0.68 0.15 25)"
                }
                strokeWidth={1.5}
                dot={{
                  r: 2,
                  fill:
                    nowMrr >= decMrr
                      ? "oklch(0.68 0.15 142)"
                      : "oklch(0.68 0.15 25)",
                  strokeWidth: 0,
                }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      {/* MRR slope label — mathematically accurate $/month rate */}
      {(decMrr > 0 || nowMrr > 0) && (
        <div className="mt-1 text-right">
          <span
            className="text-[10px] font-semibold tracking-tight"
            style={{ color: getColorForDelta(decMrr, nowMrr) }}
          >
            {mrrSlope >= 0 ? "+" : "-"}${compactNumber(Math.abs(mrrSlope))}/mo
          </span>
        </div>
      )}
    </button>
  );
}

const CATEGORY_META: Record<
  string,
  {
    label: string;
    color: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  discovery: { label: "Discovery", color: "#8b5cf6", Icon: Telescope },
  music: { label: "Music", color: "#ec4899", Icon: Music2 },
  selfimprovement: { label: "Self Imp", color: "#06b6d4", Icon: Brain },
  money: { label: "Money", color: "#10b981", Icon: Banknote },
  spirituality: { label: "Spirit", color: "#f59e0b", Icon: Sun },
  tech: { label: "Tech", color: "#3b82f6", Icon: Cpu },
  health: { label: "Health", color: "#ef4444", Icon: Activity },
  relationships: { label: "Relations", color: "#f43f5e", Icon: HeartHandshake },
  sports: { label: "Sports", color: "#f97316", Icon: Dumbbell },
  hobbies: { label: "Hobbies", color: "#a855f7", Icon: Wand2 },
};

const MinimalCardsView = memo(function MinimalCardsView({
  data,
  currency,
  format,
  isARR,
  discoveryMap,
  hideNoMatch,
  mrrDeltaFilter = "all",
  isMegaAll = false,
}: {
  data: EnrichedCommunity[];
  currency: string;
  format: (a: number, c: string) => string;
  isARR: boolean;
  discoveryMap?: {
    slugMap: Map<string, Community>;
    nameMap: Map<string, Community>;
  };
  hideNoMatch?: boolean;
  mrrDeltaFilter?: "all" | "growth" | "declined";
  isMegaAll?: boolean;
}) {
  if (data.length === 0) return <EmptyState />;

  const findMatch = (c: EnrichedCommunity): Community | undefined => {
    if (!discoveryMap) return undefined;
    const slug = extractSlug(c.url);
    if (slug) {
      const m = discoveryMap.slugMap.get(slug);
      if (m) return m;
    }
    return discoveryMap.nameMap.get(normalizeName(c.name));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
      {data.map((community, index) => {
        if (discoveryMap) {
          const match = findMatch(community);
          if (match) {
            // Apply MRR delta filter
            if (mrrDeltaFilter !== "all") {
              const mrrGrew = match.mrr > community.mrr;
              const mrrDeclined = match.mrr < community.mrr;
              if (mrrDeltaFilter === "growth" && !mrrGrew) return null;
              if (mrrDeltaFilter === "declined" && !mrrDeclined) return null;
            }
            return (
              <Top500ComparisonCard
                key={community.id}
                community={community}
                match={match}
                currency={currency}
                format={format}
                index={index}
              />
            );
          }
          if (hideNoMatch) return null;
          // No match: show normal card with Dec '25 badge
          const tier = getTierInfo(community.activeRevenue);
          const ticketTier = getTicketTierInfo(community.ticketSize);
          return (
            <button
              type="button"
              key={community.id}
              onClick={() =>
                community.url && window.open(community.url, "_blank")
              }
              style={{ animationDelay: `${Math.min(index, 20) * 30}ms` }}
              className={`group relative flex flex-col justify-between p-4 bg-[#0a0a0a] hover:bg-[#111] border motion-safe:transition-all duration-150 rounded-xl w-full text-left motion-safe:animate-fadeInUp motion-safe:hover:scale-[1.012] motion-safe:hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 will-change-transform [contain:layout_style_paint] ${tier.border} ${tier.bg} min-h-[110px] ${
                community.url ? "cursor-pointer" : ""
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div
                  className={`w-8 h-8 shrink-0 rounded-md flex items-center justify-center ${ticketTier.bg} ${ticketTier.text} text-[10px] font-black shadow-sm`}
                  title={ticketTier.label}
                >
                  {ticketTier.abbr}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-zinc-100 truncate tracking-tight group-hover:text-white transition-colors">
                    {community.name}
                  </h4>
                </div>
                <span className="shrink-0 text-[9px] font-bold text-zinc-600 bg-zinc-800 px-1.5 py-0.5 rounded">
                  Dec &apos;25
                </span>
              </div>

              <div className="mt-4 flex items-end justify-between pt-1">
                <div className="flex items-center gap-2 text-[12.5px] text-zinc-100 font-bold pb-0.5 tracking-tight">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-zinc-400" />{" "}
                    {compactNumber(community.members)}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span>
                    ${compactNumber(community.ticketSize)}
                    <span className="text-zinc-400 text-[10px]">
                      /{isARR ? "y" : "m"}
                    </span>
                  </span>
                </div>
                <div
                  className={`text-[20px] font-black tracking-tighter leading-none ${tier.color} ${tier.glow}`}
                >
                  {format(community.activeRevenue, currency)}
                </div>
              </div>
            </button>
          );
        }

        const tier = getTierInfo(community.activeRevenue);
        const ticketTier = getTicketTierInfo(community.ticketSize);
        const catMeta =
          isMegaAll && community.sourceCategory
            ? CATEGORY_META[community.sourceCategory]
            : null;
        const isFixed = community.pricingType === "fixed";
        const isYearly = community.pricingType === "yearly";

        return (
          <button
            type="button"
            key={community.id}
            onClick={() =>
              community.url && window.open(community.url, "_blank")
            }
            style={{ animationDelay: `${Math.min(index, 20) * 30}ms` }}
            className={`group relative flex flex-col justify-between p-4 bg-[#0a0a0a] hover:bg-[#111] border motion-safe:transition-all duration-150 rounded-xl w-full text-left motion-safe:animate-fadeInUp motion-safe:hover:scale-[1.012] motion-safe:hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 will-change-transform [contain:layout_style_paint] ${tier.border} ${tier.bg} min-h-[110px] ${
              community.url ? "cursor-pointer" : ""
            }`}
          >
            {/* Source category pill for Mega All */}
            {catMeta && (
              <div
                className="absolute top-1.5 right-1.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold z-10"
                style={{
                  backgroundColor: `${catMeta.color}22`,
                  color: catMeta.color,
                  border: `1px solid ${catMeta.color}40`,
                }}
              >
                <catMeta.Icon className="w-2.5 h-2.5" />
                <span>{catMeta.label}</span>
              </div>
            )}
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div
                className={`w-8 h-8 shrink-0 rounded-md flex items-center justify-center ${ticketTier.bg} ${ticketTier.text} text-[10px] font-black shadow-sm`}
                title={ticketTier.label}
              >
                {ticketTier.abbr}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-zinc-100 truncate tracking-tight group-hover:text-white transition-colors">
                  {community.name}
                </h4>
              </div>
              {isFixed && (
                <span className="shrink-0 text-[8px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded-full">
                  ONE-TIME
                </span>
              )}
              {isYearly && (
                <span className="shrink-0 text-[8px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30 px-1.5 py-0.5 rounded-full">
                  YEARLY
                </span>
              )}
            </div>

            <div className="mt-4 flex items-end justify-between pt-1">
              <div className="flex items-center gap-2 text-[12.5px] text-zinc-100 font-bold pb-0.5 tracking-tight">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-zinc-400" />{" "}
                  {compactNumber(community.members)}
                </span>
                <span className="text-zinc-600">•</span>
                {isFixed ? (
                  <span className="text-amber-400">
                    ${compactNumber(community.fixedPrice)}
                    <span className="text-zinc-400 text-[10px]"> one-time</span>
                  </span>
                ) : isYearly ? (
                  <span className="flex flex-col items-start">
                    <span className="text-sky-400">
                      ${compactNumber(community.yearlyPrice)}/yr
                    </span>
                    <span className="text-zinc-500 text-[9px]">
                      ~${compactNumber(community.ticketSize)}/mo
                    </span>
                  </span>
                ) : (
                  <span>
                    ${compactNumber(community.ticketSize)}
                    <span className="text-zinc-400 text-[10px]">
                      /{isARR ? "y" : "m"}
                    </span>
                  </span>
                )}
              </div>
              {isYearly ? (
                <div className="flex flex-col items-end">
                  <span
                    className={`text-[20px] font-black tracking-tighter leading-none tabular-nums ${tier.color} ${tier.glow}`}
                  >
                    {isARR
                      ? format(
                          community.yearlyPrice * community.members,
                          currency,
                        )
                      : format(
                          Math.round(
                            (community.yearlyPrice * community.members) / 12,
                          ),
                          currency,
                        )}
                  </span>
                  <span className="text-[12px] font-semibold text-orange-100/65 mt-0.5 leading-none tabular-nums">
                    {isARR
                      ? `~${format(Math.round((community.yearlyPrice * community.members) / 12), currency)}/mo`
                      : `${format(community.yearlyPrice * community.members, currency)}/yr`}
                  </span>
                </div>
              ) : (
                <div
                  className={`text-[20px] font-black tracking-tighter leading-none tabular-nums ${isFixed ? "text-amber-500" : tier.color} ${tier.glow}`}
                >
                  {isFixed
                    ? format(community.fixedPrice * community.members, currency)
                    : format(community.activeRevenue, currency)}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
});

const LedgerView = memo(function LedgerView({
  data,
  currency,
  format,
  isARR,
  discoveryMap,
  isTop500,
}: {
  data: EnrichedCommunity[];
  currency: string;
  format: (a: number, c: string) => string;
  isARR: boolean;
  discoveryMap?: {
    slugMap: Map<string, Community>;
    nameMap: Map<string, Community>;
  };
  isTop500?: boolean;
}) {
  if (data.length === 0) return <EmptyState />;

  const findLedgerMatch = (c: EnrichedCommunity): Community | undefined => {
    if (!discoveryMap) return undefined;
    const slug = extractSlug(c.url);
    if (slug) {
      const m = discoveryMap.slugMap.get(slug);
      if (m) return m;
    }
    return discoveryMap.nameMap.get(normalizeName(c.name));
  };

  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="border-b border-zinc-800 bg-[#111]">
              <th className="p-3 pl-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Community
              </th>
              <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Region
              </th>
              <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-right">
                Audience
              </th>
              <th className="p-3 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-right">
                Ticket
              </th>
              <th className="p-3 pr-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-right">
                Revenue ({isARR ? "ARR" : "MRR"})
              </th>
              {isTop500 && discoveryMap && (
                <th className="p-3 pr-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500 text-right">
                  Delta
                </th>
              )}
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {data.map((community, index) => {
              const tier = getTierInfo(community.activeRevenue);
              const ticketTier = getTicketTierInfo(community.ticketSize);
              return (
                <tr
                  key={community.id}
                  onClick={() =>
                    community.url && window.open(community.url, "_blank")
                  }
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    community.url &&
                    window.open(community.url, "_blank")
                  }
                  style={{ animationDelay: `${Math.min(index, 30) * 20}ms` }}
                  className={`border-b border-zinc-800/50 hover:bg-zinc-900 transition-colors animate-fadeIn ${tier.bg} ${
                    community.url ? "cursor-pointer" : ""
                  }`}
                >
                  <td className="p-3 pl-4 font-semibold text-zinc-200">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center ${ticketTier.bg} ${ticketTier.text} text-[8px] font-black shadow-sm`}
                        title={ticketTier.label}
                      >
                        {ticketTier.abbr}
                      </div>
                      <span className="truncate max-w-[200px] sm:max-w-[300px] block">
                        {community.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className="text-zinc-400 text-xs font-medium tracking-wide flex items-center gap-1.5"
                      title={community.language.lang}
                    >
                      {community.language.flag} {community.language.lang}
                    </span>
                  </td>
                  <td className="p-3 text-zinc-400 text-right font-mono">
                    {compactNumber(community.members)}
                  </td>
                  <td className="p-3 text-right font-mono">
                    {community.pricingType === "fixed" ? (
                      <span className="text-amber-400 text-[12px] font-bold">
                        ${compactNumber(community.fixedPrice)}
                        <span className="text-[9px] text-amber-600 ml-0.5">
                          1x
                        </span>
                      </span>
                    ) : community.pricingType === "yearly" ? (
                      <span className="text-sky-400 text-[12px] font-bold flex flex-col items-end">
                        <span>${compactNumber(community.yearlyPrice)}/yr</span>
                        <span className="text-[9px] text-zinc-500">
                          ~${compactNumber(community.ticketSize)}/mo
                        </span>
                      </span>
                    ) : (
                      <span className="text-zinc-400">
                        ${compactNumber(community.ticketSize)}
                      </span>
                    )}
                  </td>
                  <td
                    className={`p-3 pr-4 font-black text-right tracking-tight font-mono tabular-nums ${community.pricingType === "fixed" ? "text-amber-500" : community.pricingType === "yearly" ? "text-sky-400" : tier.color} ${tier.glow}`}
                  >
                    {community.pricingType === "fixed" ? (
                      format(community.fixedPrice * community.members, currency)
                    ) : community.pricingType === "yearly" ? (
                      <div className="flex flex-col items-end">
                        <span>
                          {isARR
                            ? format(
                                community.yearlyPrice * community.members,
                                currency,
                              )
                            : format(
                                Math.round(
                                  (community.yearlyPrice * community.members) /
                                    12,
                                ),
                                currency,
                              )}
                        </span>
                        <span className="text-[12px] font-semibold text-orange-100/65 leading-none tabular-nums mt-0.5">
                          {isARR
                            ? `~${format(Math.round((community.yearlyPrice * community.members) / 12), currency)}/mo`
                            : `${format(community.yearlyPrice * community.members, currency)}/yr`}
                        </span>
                      </div>
                    ) : (
                      format(community.activeRevenue, currency)
                    )}
                  </td>
                  {isTop500 &&
                    discoveryMap &&
                    (() => {
                      const match = findLedgerMatch(community);
                      if (!match)
                        return (
                          <td className="p-3 pr-4 text-right text-zinc-600 font-mono text-[11px]">
                            —
                          </td>
                        );
                      const decMembers = community.members;
                      const nowMembers = match.members;
                      const decMrr = community.mrr;
                      const nowMrr = match.mrr;
                      const membersDelta = nowMembers - decMembers;
                      const mrrDelta = nowMrr - decMrr;
                      const membersSign = membersDelta >= 0 ? "+" : "";
                      const mrrSign = mrrDelta >= 0 ? "+" : "";
                      const membersCol = getColorForDelta(
                        decMembers,
                        nowMembers,
                      );
                      const mrrCol = getColorForDelta(decMrr, nowMrr);
                      return (
                        <td className="p-3 pr-4 text-right font-mono">
                          <div className="flex flex-col items-end gap-0.5">
                            <span
                              className="text-[11px] font-bold"
                              style={{ color: membersCol }}
                            >
                              {membersSign}
                              {compactNumber(Math.abs(membersDelta))}
                            </span>
                            <span
                              className="text-[10px] font-semibold"
                              style={{ color: mrrCol }}
                            >
                              {mrrSign}${compactNumber(Math.abs(mrrDelta))}
                            </span>
                          </div>
                        </td>
                      );
                    })()}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

const ObservatoryView = memo(function ObservatoryView({
  data,
  currency,
  format,
  isARR,
  totalRev,
}: {
  data: EnrichedCommunity[];
  currency: string;
  format: (a: number, c: string) => string;
  isARR: boolean;
  totalRev: number;
}) {
  const scatterData = data.filter((d) => d.activeRevenue > 0);
  const topEarners = [...data]
    .sort((a, b) => b.activeRevenue - a.activeRevenue)
    .slice(0, 10);

  const pieData = [
    {
      name: "$500k+",
      value: data
        .filter((d) => d.activeRevenue >= 500000)
        .reduce((a, c) => a + c.activeRevenue, 0),
      color: "#ef4444",
    },
    {
      name: "$100k-$500k",
      value: data
        .filter((d) => d.activeRevenue >= 100000 && d.activeRevenue < 500000)
        .reduce((a, c) => a + c.activeRevenue, 0),
      color: "#fb7185",
    },
    {
      name: "$25k-$100k",
      value: data
        .filter((d) => d.activeRevenue >= 25000 && d.activeRevenue < 100000)
        .reduce((a, c) => a + c.activeRevenue, 0),
      color: "#facc15",
    },
    {
      name: "$10k-$25k",
      value: data
        .filter((d) => d.activeRevenue >= 10000 && d.activeRevenue < 25000)
        .reduce((a, c) => a + c.activeRevenue, 0),
      color: "#84cc16",
    },
    {
      name: "$1k-$10k",
      value: data
        .filter((d) => d.activeRevenue >= 1000 && d.activeRevenue < 10000)
        .reduce((a, c) => a + c.activeRevenue, 0),
      color: "#f0abfc",
    },
    {
      name: "<$1k",
      value: data
        .filter((d) => d.activeRevenue < 1000)
        .reduce((a, c) => a + c.activeRevenue, 0),
      color: "#a1a1aa",
    },
  ].filter((d) => d.value > 0);

  let countFree = 0;
  let countUnder50 = 0;
  let count50to99 = 0;
  let count100to499 = 0;
  let count500plus = 0;
  for (const d of data) {
    if (d.ticketSize === 0) countFree++;
    else if (d.ticketSize < 50) countUnder50++;
    else if (d.ticketSize < 100) count50to99++;
    else if (d.ticketSize < 500) count100to499++;
    else count500plus++;
  }
  const priceHistogram = [
    { name: "Free", count: countFree },
    { name: "<$50", count: countUnder50 },
    { name: "$50-$99", count: count50to99 },
    { name: "$100-$499", count: count100to499 },
    { name: "$500+", count: count500plus },
  ];

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: Record<string, unknown> }>;
  }) => {
    if (active && payload && payload.length) {
      const pData = payload[0].payload;
      return (
        <div className="bg-[#111] border border-zinc-800 p-3 rounded-lg shadow-xl">
          <p className="text-xs font-bold text-white mb-2">
            {String(pData.name || pData.date || "")}
          </p>
          {pData.members !== undefined && (
            <p className="text-[10px] text-zinc-400 font-mono">
              Audience: {compactNumber(pData.members as number)}
            </p>
          )}
          {pData.ticketSize !== undefined && (
            <p className="text-[10px] text-zinc-400 font-mono">
              Ticket: ${compactNumber(pData.ticketSize as number)}
            </p>
          )}
          {pData.activeRevenue !== undefined && (
            <p className="text-xs font-black text-white mt-1 font-mono">
              {format(pData.activeRevenue as number, currency)}
            </p>
          )}
          {pData.count !== undefined && (
            <p className="text-xs font-bold text-white">
              {String(pData.count)} Nodes
            </p>
          )}
          {pData.revenue !== undefined && (
            <p className="text-xs font-bold text-white">
              {format(pData.revenue as number, currency)}
            </p>
          )}
          {pData.value !== undefined && (
            <p className="text-xs font-bold text-white">
              {format(pData.value as number, currency)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const timelineData = Array.from({ length: 30 }).map((_, i) => {
    const month = new Date();
    month.setMonth(month.getMonth() - (29 - i));
    const base = totalRev * 0.3;
    return {
      date: month.toLocaleString("default", {
        month: "short",
        year: "2-digit",
      }),
      revenue: Math.floor(
        base + i * (totalRev * 0.02) + Math.sin(i) * (totalRev * 0.06),
      ),
    };
  });

  return (
    <div className="space-y-6">
      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col h-[400px]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-zinc-200 flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-zinc-400" /> Global Portfolio
            Trajectory
          </h3>
          <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold bg-zinc-900 px-2 py-1 rounded">
            Interactive
          </span>
        </div>
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#71717a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#71717a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                stroke="#71717a"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#71717a"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${compactNumber(v as number)}`}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#a1a1aa"
                strokeWidth={2}
                fill="url(#colorRev)"
              />
              <Brush
                dataKey="date"
                height={30}
                stroke="#71717a"
                fill="#09090b"
                travellerWidth={10}
                className="opacity-80 border-zinc-800"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col h-[350px]">
          <h3 className="font-bold text-zinc-200 mb-4 flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-zinc-400" /> Audience vs.{" "}
            {isARR ? "ARR" : "MRR"}
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  type="number"
                  dataKey="members"
                  name="Audience"
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(v) => compactNumber(v as number)}
                />
                <YAxis
                  type="number"
                  dataKey="activeRevenue"
                  name="Revenue"
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(v) => compactNumber(v as number)}
                  width={50}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ strokeDasharray: "3 3", stroke: "#3f3f46" }}
                />
                <Scatter data={scatterData} fill="#3b82f6" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col h-[350px]">
          <h3 className="font-bold text-zinc-200 mb-4 flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-zinc-400" /> Price vs.{" "}
            {isARR ? "ARR" : "MRR"}
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  type="number"
                  dataKey="ticketSize"
                  name="Ticket"
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(v) => `$${compactNumber(v as number)}`}
                />
                <YAxis
                  type="number"
                  dataKey="activeRevenue"
                  name="Revenue"
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(v) => compactNumber(v as number)}
                  width={50}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ strokeDasharray: "3 3", stroke: "#3f3f46" }}
                />
                <Scatter data={scatterData} fill="#facc15" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col h-[350px]">
          <h3 className="font-bold text-zinc-200 mb-4 flex items-center gap-2 text-sm">
            <Layers className="w-4 h-4 text-zinc-400" /> Price vs. Audience
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  type="number"
                  dataKey="ticketSize"
                  name="Ticket"
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(v) => `$${compactNumber(v as number)}`}
                />
                <YAxis
                  type="number"
                  dataKey="members"
                  name="Audience"
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(v) => compactNumber(v as number)}
                  width={50}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ strokeDasharray: "3 3", stroke: "#3f3f46" }}
                />
                <Scatter data={scatterData} fill="#ec4899" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col h-[400px]">
          <h3 className="font-bold text-zinc-200 mb-4 flex items-center gap-2 text-sm">
            <Crown className="w-4 h-4 text-zinc-400" /> Revenue Leaders
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={topEarners}
                layout="vertical"
                margin={{ top: 0, right: 20, left: 40, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  horizontal={true}
                  vertical={false}
                />
                <XAxis
                  type="number"
                  stroke="#71717a"
                  fontSize={10}
                  tickFormatter={(v) => compactNumber(v as number)}
                  hide
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="#a1a1aa"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  width={120}
                />
                <Tooltip
                  cursor={{ fill: "#18181b" }}
                  content={<CustomTooltip />}
                />
                <Bar dataKey="activeRevenue" radius={[0, 4, 4, 0]} barSize={16}>
                  {topEarners.map((entry) => {
                    const tier = getTierInfo(entry.activeRevenue);
                    const fillMap: Record<string, string> = {
                      "text-red-500": "#ef4444",
                      "text-rose-400": "#fb7185",
                      "text-yellow-400": "#facc15",
                      "text-lime-500": "#84cc16",
                      "text-fuchsia-300": "#f0abfc",
                      "text-zinc-400": "#a1a1aa",
                    };
                    return (
                      <Cell
                        key={`bar-${entry.id}`}
                        fill={fillMap[tier.color] || "#a1a1aa"}
                      />
                    );
                  })}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col h-[400px]">
          <h3 className="font-bold text-zinc-200 mb-4 flex items-center gap-2 text-sm">
            <BarChart3 className="w-4 h-4 text-zinc-400" /> Tier Distribution
          </h3>
          <div className="flex-1 min-h-0 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="80%"
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry) => (
                    <Cell key={`pie-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {pieData.map((d) => (
              <div
                key={d.name}
                className="flex justify-between items-center text-xs"
              >
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />{" "}
                  {d.name}
                </span>
                <span className="text-zinc-200 font-mono font-bold">
                  {format(d.value, currency)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 shadow-sm flex flex-col h-[300px]">
          <h3 className="font-bold text-zinc-200 mb-4 flex items-center gap-2 text-sm">
            <BarChart3 className="w-4 h-4 text-zinc-400" /> Price Point Density
          </h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={priceHistogram}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#71717a"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#71717a"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: "#18181b" }}
                  content={<CustomTooltip />}
                />
                <Bar
                  dataKey="count"
                  fill="#84cc16"
                  radius={[4, 4, 0, 0]}
                  barSize={32}
                />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
});

const AICopilot = memo(function AICopilot({
  data,
  currency,
  format,
  isARR,
  onClose,
}: {
  data: EnrichedCommunity[];
  currency: string;
  format: (a: number, c: string) => string;
  isARR: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Data matrix ingested. What specific anomalies or patterns would you like to uncover?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll trigger
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "";
      const lowerMsg = userMsg.toLowerCase();

      if (data.length === 0) {
        aiResponse = "Matrix is empty.";
      } else if (lowerMsg.includes("highest") || lowerMsg.includes("top")) {
        const top = [...data].sort(
          (a, b) => b.activeRevenue - a.activeRevenue,
        )[0];
        aiResponse = `Peak asset detected: **${top.name}** generating **${format(top.activeRevenue, currency)} ${isARR ? "ARR" : "MRR"}** (${compactNumber(top.members)} members @ $${compactNumber(top.ticketSize)}).`;
      } else if (lowerMsg.includes("average") || lowerMsg.includes("avg")) {
        const paidData = data.filter((d) => d.ticketSize > 0);
        const avgTicket = paidData.length
          ? Math.round(
              paidData.reduce((a, c) => a + c.ticketSize, 0) / paidData.length,
            )
          : 0;
        const avgRev = data.length
          ? data.reduce((a, c) => a + c.activeRevenue, 0) / data.length
          : 0;
        aiResponse = `Mean metrics calculated: Ticket Price **$${compactNumber(avgTicket)}**, Revenue **${format(avgRev, currency)} ${isARR ? "ARR" : "MRR"}**.`;
      } else {
        const total = format(
          data.reduce((a, c) => a + c.activeRevenue, 0),
          currency,
        );
        aiResponse = `Global pipeline resolves to **${total}**. Ask for specific maxima, minima, or averages.`;
      }

      setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between shrink-0 bg-[#0a0a0a]">
        <h3 className="font-bold text-zinc-100 text-sm flex items-center gap-2">
          <Bot className="w-4 h-4" /> Insight Copilot
        </h3>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="relative z-[60] p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer pointer-events-auto"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#0a0a0a]">
        {messages.map((msg, i) => (
          <div
            key={`msg-${i}-${msg.role}`}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 text-[13px] leading-relaxed shadow-sm border ${
                msg.role === "user"
                  ? "bg-zinc-200 text-zinc-900 border-zinc-200"
                  : "bg-[#111] border-zinc-800 text-zinc-300"
              }`}
            >
              {msg.text.split("**").map((chunk, j) =>
                j % 2 === 1 ? (
                  <strong
                    // biome-ignore lint/suspicious/noArrayIndexKey: split index is stable
                    key={`bold-${j}`}
                    className={
                      msg.role === "user" ? "text-black" : "text-white"
                    }
                  >
                    {chunk}
                  </strong>
                ) : (
                  chunk
                ),
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#111] border border-zinc-800 rounded-lg p-4 flex gap-1.5 shadow-sm">
              <span
                className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="p-4 border-t border-zinc-800 shrink-0 bg-[#0a0a0a]">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Query data model..."
            className="w-full bg-[#111] border border-zinc-800 rounded-md py-2.5 pl-3 pr-10 text-[13px] text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-all pointer-events-auto"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-1.5 w-7 h-7 rounded bg-zinc-200 flex items-center justify-center text-zinc-900 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all pointer-events-auto"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
});

const EmptyState = memo(function EmptyState({
  onReset,
}: { onReset?: () => void }) {
  return (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center text-center">
      <Filter className="w-8 h-8 text-zinc-700 mb-3" />
      <h3 className="text-sm font-semibold text-zinc-300">No results</h3>
      <p className="text-xs text-zinc-500 mt-1 mb-4">
        Adjust filters or search query.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg transition-all duration-150 active:scale-95"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
});
