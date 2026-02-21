const fs = require('fs');

const data = [
  {
    "goalName": "GATE CSE",
    "subGoals": [
      {
        "title": "Discrete Math: Logic, Sets, Relations",
        "description": "YT: Gate Smashers - Discrete Maths... | Book: Rosen Ch.1,2,9... | Practice: GFG GATE Discrete Math PY...",
        "startDate": "Feb 24-Mar 1",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Discrete Math: Functions, Graphs, Counting",
        "description": "YT: Gate Smashers - Graph Theory+C... | Book: Rosen Ch.2,6,10-11... | Practice: GFG GATE Graph Theory PYQ...",
        "startDate": "Mar 2-Mar 8",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Discrete Math: Proofs, Recurrences",
        "description": "YT: Gate Smashers - Recurrence Rel... | Book: Rosen Ch.5,8... | Practice: GATE PYQs on recurrences ...",
        "startDate": "Mar 9-Mar 15",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Linear Algebra",
        "description": "YT: 3Blue1Brown - Essence of Linea... | Book: Adv Engg Math (Kreys... | Practice: GFG Linear Algebra GATE P...",
        "startDate": "Mar 16-Mar 22",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Linear Algebra (cont.) + Calculus",
        "description": "YT: 3Blue1Brown - LA (10-15) + Cal... | Book: Calculus Know-It-All... | Practice: GFG Calculus GATE PYQs; G...",
        "startDate": "Mar 23-Mar 29",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Probability & Statistics",
        "description": "YT: StatQuest - Statistics Fundame... | Book: Probability & Statis... | Practice: GFG Probability PYQs; GAT...",
        "startDate": "Mar 30-Apr 5",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Stats (cont.) + Optimization Intro",
        "description": "YT: StatQuest - ML early videos (r... | Book: Veerarajan Ch.5-7; A... | Practice: GATE DA stats PYQs; GFG s...",
        "startDate": "Apr 6-Apr 12",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "C Programming + Python Primer",
        "description": "YT: Gate Smashers - C for GATE; Co... | Book: Narasimha Karumanchi... | Practice: HackerRank C (10-15); Hac...",
        "startDate": "Apr 13-Apr 19",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "DS: Arrays, Linked Lists, Stacks, Queues",
        "description": "YT: Abdul Bari - DS (Arrays, LL, S... | Book: Karumanchi Ch.2-5... | Practice: LeetCode LL Easy-Medium (...",
        "startDate": "Apr 20-Apr 26",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "DS: Trees, BST, Heaps",
        "description": "YT: Abdul Bari - Trees; Gate Smash... | Book: Karumanchi Ch.6... | Practice: LeetCode Tree (10); GATE ...",
        "startDate": "Apr 27-May 3",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "DS: Hashing, Graph representation",
        "description": "YT: Gate Smashers - Hashing+Graph ... | Book: Karumanchi Ch.9 (9.1... | Practice: LeetCode Hash Table (5-8)...",
        "startDate": "May 4-May 10",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Algo: Sorting, Searching, Complexity",
        "description": "YT: Abdul Bari - Sorting (all); Ga... | Book: CLRS 4e Ch.2,3,7,8... | Practice: GFG sorting PYQs; LeetCod...",
        "startDate": "May 11-May 17",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Algo: Graph Algorithms (BFS, DFS, SP, MST)",
        "description": "YT: Abdul Bari - Graph Algos (Dijk... | Book: CLRS 4e Ch.22-25... | Practice: LeetCode Graph Medium (10...",
        "startDate": "May 18-May 24",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Algo: D&C, Greedy, DP",
        "description": "YT: Abdul Bari - Greedy+DP (comple... | Book: CLRS 4e Ch.15-16; Sk... | Practice: LeetCode DP (15); GATE PY...",
        "startDate": "May 25-May 31",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Algo: NP-Completeness, Backtracking, Strings",
        "description": "YT: Gate Smashers - NP+String; Abd... | Book: CLRS 4e Ch.34; Skien... | Practice: GATE NP PYQs; LeetCode Ha...",
        "startDate": "Jun 1-Jun 7",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "TOC: Finite Automata, Regular Languages",
        "description": "YT: Ravindrababu Ravula - TOC (DFA... | Book: Sipser 3e Ch.1 (1.1-... | Practice: GATE TOC PYQs 2010-2023; ...",
        "startDate": "Jun 8-Jun 14",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "TOC: CFG, PDAs, CFLs",
        "description": "YT: Ravindrababu Ravula - TOC (CFG... | Book: Sipser 3e Ch.2 (2.1-... | Practice: GATE CFG/CFL PYQs 2010-20...",
        "startDate": "Jun 15-Jun 21",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "TOC: Turing Machines, Decidability",
        "description": "YT: Ravindrababu Ravula - TOC (TM+... | Book: Sipser 3e Ch.3-5... | Practice: GATE TM+decidability PYQs...",
        "startDate": "Jun 22-Jun 28",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Compiler: Lexical Analysis, LL(1) Parsing",
        "description": "YT: Ravindrababu Ravula - Compiler... | Book: Dragon Book Ch.1,3,4... | Practice: GATE FIRST/FOLLOW PYQs; G...",
        "startDate": "Jun 29-Jul 5",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Compiler: LR Parsing, SDT, Code Generation",
        "description": "YT: Ravindrababu Ravula - Compiler... | Book: Dragon Book Ch.4 (4.... | Practice: GATE LR parsing PYQs; Tes...",
        "startDate": "Jul 6-Jul 12",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "OS: Processes, Threads, Scheduling",
        "description": "YT: Gate Smashers - OS (Process+Sc... | Book: Silberschatz OS 8e C... | Practice: GATE scheduling PYQs (Gan...",
        "startDate": "Jul 13-Jul 19",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "OS: Sync, Deadlocks, Memory, File Systems",
        "description": "YT: Gate Smashers - OS (Sync, Dead... | Book: Silberschatz Ch.6-11... | Practice: GATE Banker's algo; page ...",
        "startDate": "Jul 20-Jul 26",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Computer Networks Pt.1 (Protocols, TCP/IP)",
        "description": "YT: Neso Academy - CN (full); Gate... | Book: Kurose 7e Ch.1-3; Ta... | Practice: GATE CN PYQs 2013-2023; C...",
        "startDate": "Sep 7-Sep 13",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Computer Networks Pt.2 (Routing, DNS, Security)",
        "description": "YT: Neso Academy - CN (cont); Gate... | Book: Kurose Ch.4-6; Tanen... | Practice: GATE CN PYQs (cont); Pack...",
        "startDate": "Sep 14-Sep 20",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Digital Logic + COA Pt.1",
        "description": "YT: Gate Smashers - Digital Logic+... | Book: Morris Mano Digital ... | Practice: GATE DL+COA PYQs 2013-202...",
        "startDate": "Sep 21-Sep 27",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "COA Pt.2 (Pipelining, Memory, Performance)",
        "description": "YT: Gate Smashers - COA (cont); Ne... | Book: Patterson & Hennessy... | Practice: GATE COA PYQs (cont); pip...",
        "startDate": "Sep 28-Oct 4",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Revision: Discrete Math + Engg Math",
        "description": "YT: Gate Smashers (recap); YouTube... | Book: Rosen, Calculus, Adv... | Practice: GFG GATE math PYQs 2014-2...",
        "startDate": "Nov 30-Dec 6",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Revision: Digital Logic + COA",
        "description": "YT: Gate Smashers (recap); Neso Ac... | Book: Morris Mano, Patters... | Practice: GATE DL+COA PYQs 2013-202...",
        "startDate": "Dec 7-Dec 13",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Revision: DS + Algorithms",
        "description": "YT: Abdul Bari (recap playlists); ... | Book: CLRS 4e, Karumanchi ... | Practice: GATE DS+Algo PYQs 2013-20...",
        "startDate": "Dec 14-Dec 20",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Revision: TOC + Compiler Design",
        "description": "YT: Ravindrababu Ravula (recap); G... | Book: Sipser, Dragon Book ... | Practice: GATE TOC+Compiler PYQs 20...",
        "startDate": "Dec 21-Dec 27",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Revision: OS + DBMS",
        "description": "YT: Gate Smashers (recap); Neso Ac... | Book: Silberschatz OS+DB (... | Practice: GATE OS+DBMS PYQs 2010-20...",
        "startDate": "Dec 28-Jan 3",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Revision: CN + GATE DA (ML, AI)",
        "description": "YT: Gate Smashers + Neso (recap); ... | Book: Kurose, Russell & No... | Practice: GATE CN 2010-2023; GATE D...",
        "startDate": "Jan 4-Jan 10",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Full Mock Tests - GATE CS Set 1",
        "description": "YT: Focus areas from mock performa... | Book: GATE syllabus (refer... | Practice: MadeEasy/Testbook full GA...",
        "startDate": "Jan 11-Jan 17",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Full Mock Tests - GATE DA Set 1",
        "description": "YT: Focus areas from mock performa... | Book: GATE DA syllabus (re... | Practice: Testbook GATE DA mocks; G...",
        "startDate": "Jan 18-Jan 24",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Final Intensive Revision",
        "description": "YT: Error analysis from mocks; You... | Book: Weak topic books (re... | Practice: Weak topic PYQs; speed dr...",
        "startDate": "Jan 25-Jan 31",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Exam Prep - Strategy & Light Review",
        "description": "YT: Mock error analysis; strategy ... | Book: Formula sheets (refe... | Practice: Final PYQ speed drills; s...",
        "startDate": "Feb 1-Feb 7",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Final Days - Rest & Focus",
        "description": "YT: Light recap only... | Book: Notes (reference)... | Practice: Rest 2 days; light review...",
        "startDate": "Feb 8-Feb 14",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "GATE 2027 EXAM WEEK",
        "description": "YT: N/A - Exam focus... | Book: N/A... | Practice: GATE 2027 CS & DA Exams...",
        "startDate": "Feb 15-Feb 21",
        "endDate": "",
        "tasks": []
      }
    ]
  },
  {
    "goalName": "GATE DA",
    "subGoals": [
      {
        "title": "Discrete Math: Logic, Sets, Relations",
        "description": "YT: Gate Smashers - Discrete Maths... | Book: Rosen Ch.1,2,9... | Practice: GFG GATE Discrete Math PY...",
        "startDate": "Feb 24-Mar 1",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Discrete Math: Functions, Graphs, Counting",
        "description": "YT: Gate Smashers - Graph Theory+C... | Book: Rosen Ch.2,6,10-11... | Practice: GFG GATE Graph Theory PYQ...",
        "startDate": "Mar 2-Mar 8",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Discrete Math: Proofs, Recurrences",
        "description": "YT: Gate Smashers - Recurrence Rel... | Book: Rosen Ch.5,8... | Practice: GATE PYQs on recurrences ...",
        "startDate": "Mar 9-Mar 15",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Linear Algebra",
        "description": "YT: 3Blue1Brown - Essence of Linea... | Book: Adv Engg Math (Kreys... | Practice: GFG Linear Algebra GATE P...",
        "startDate": "Mar 16-Mar 22",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Linear Algebra (cont.) + Calculus",
        "description": "YT: 3Blue1Brown - LA (10-15) + Cal... | Book: Calculus Know-It-All... | Practice: GFG Calculus GATE PYQs; G...",
        "startDate": "Mar 23-Mar 29",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Probability & Statistics",
        "description": "YT: StatQuest - Statistics Fundame... | Book: Probability & Statis... | Practice: GFG Probability PYQs; GAT...",
        "startDate": "Mar 30-Apr 5",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Stats (cont.) + Optimization Intro",
        "description": "YT: StatQuest - ML early videos (r... | Book: Veerarajan Ch.5-7; A... | Practice: GATE DA stats PYQs; GFG s...",
        "startDate": "Apr 6-Apr 12",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "C Programming + Python Primer",
        "description": "YT: Gate Smashers - C for GATE; Co... | Book: Narasimha Karumanchi... | Practice: HackerRank C (10-15); Hac...",
        "startDate": "Apr 13-Apr 19",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "DBMS: Relational Model, SQL, Normalization",
        "description": "YT: Gate Smashers - DBMS (Rel. Alg... | Book: Silberschatz DB Conc... | Practice: HackerRank SQL (25-30); G...",
        "startDate": "Jul 27-Aug 2",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "DBMS: Transactions, Indexing, Data Warehousing",
        "description": "YT: Gate Smashers - DBMS (Transact... | Book: Silberschatz Ch.14-1... | Practice: GATE serialization+preced...",
        "startDate": "Aug 3-Aug 9",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "ML: Foundations, Supervised Learning",
        "description": "YT: StatQuest - ML (Linear Reg, Lo... | Book: Geron Hands-On ML Ch... | Practice: Kaggle Intro to ML micro-...",
        "startDate": "Aug 10-Aug 16",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "ML: Trees, Ensembles, SVM, Clustering, PCA",
        "description": "YT: StatQuest - DT, RF, SVM, K-Mea... | Book: Geron Ch.5-9... | Practice: Kaggle Intermediate ML; S...",
        "startDate": "Aug 17-Aug 23",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "ML: Neural Nets + AI Foundations (Search)",
        "description": "YT: 3Blue1Brown - Neural Networks ... | Book: Geron Ch.10; Russell... | Practice: GATE DA AI search PYQs; i...",
        "startDate": "Aug 24-Aug 30",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "AI: Logic, Uncertainty, Bayesian Networks, CSP",
        "description": "YT: Gate Smashers - Bayesian Netwo... | Book: Russell & Norvig Ch.... | Practice: GATE DA AI+uncertainty PY...",
        "startDate": "Aug 31-Sep 6",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Computer Networks Pt.1 (Protocols, TCP/IP)",
        "description": "YT: Neso Academy - CN (full); Gate... | Book: Kurose 7e Ch.1-3; Ta... | Practice: GATE CN PYQs 2013-2023; C...",
        "startDate": "Sep 7-Sep 13",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Computer Networks Pt.2 (Routing, DNS, Security)",
        "description": "YT: Neso Academy - CN (cont); Gate... | Book: Kurose Ch.4-6; Tanen... | Practice: GATE CN PYQs (cont); Pack...",
        "startDate": "Sep 14-Sep 20",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Digital Logic + COA Pt.1",
        "description": "YT: Gate Smashers - Digital Logic+... | Book: Morris Mano Digital ... | Practice: GATE DL+COA PYQs 2013-202...",
        "startDate": "Sep 21-Sep 27",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "COA Pt.2 (Pipelining, Memory, Performance)",
        "description": "YT: Gate Smashers - COA (cont); Ne... | Book: Patterson & Hennessy... | Practice: GATE COA PYQs (cont); pip...",
        "startDate": "Sep 28-Oct 4",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Cybersecurity Foundations Pt.1",
        "description": "YT: NetworkChuck - Ethical Hacking... | Book: Erickson Hacking Art... | Practice: TryHackMe Pre-Security pa...",
        "startDate": "Oct 5-Oct 11",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Cybersecurity Intermediate",
        "description": "YT: TCM Security - Practical Ethic... | Book: Web App Hacker's Han... | Practice: TryHackMe Jr Penetration ...",
        "startDate": "Oct 12-Oct 18",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "AI + ML Deep Dive Pt.1 (Neural Nets, DL)",
        "description": "YT: Andrej Karpathy - Neural Netwo... | Book: Goodfellow DL Ch.6,9... | Practice: Kaggle Digit Recognizer (...",
        "startDate": "Oct 19-Oct 25",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "AI + ML Deep Dive Pt.2 (Transformers, Advanced)",
        "description": "YT: Andrej Karpathy - Zero to Hero... | Book: Goodfellow (cont); C... | Practice: Implement bigram LM (Karp...",
        "startDate": "Oct 26-Nov 1",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "System Design Pt.1 (Fundamentals, Scalability)",
        "description": "YT: ByteByteGo (Alex Xu) - YouTube... | Book: System Design Interv... | Practice: Exponent system design pr...",
        "startDate": "Nov 2-Nov 8",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "System Design Pt.2 (Design Interviews, Practice)",
        "description": "YT: ByteByteGo (cont); Gaurav Sen ... | Book: System Design Interv... | Practice: Exponent (cont); LeetCode...",
        "startDate": "Nov 9-Nov 15",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Data Analysis Pt.1 (Pandas, SQL, Visualization)",
        "description": "YT: Alex The Analyst - Pandas+SQL ... | Book: Veerarajan Stats (re... | Practice: Kaggle Pandas micro-cours...",
        "startDate": "Nov 16-Nov 22",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Data Analysis Pt.2 (Statistical Analysis, Viz)",
        "description": "YT: Alex The Analyst (cont); Corey... | Book: Veerarajan Prob+Stat... | Practice: Complete 2-3 EDA Kaggle n...",
        "startDate": "Nov 23-Nov 29",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Revision: Discrete Math + Engg Math",
        "description": "YT: Gate Smashers (recap); YouTube... | Book: Rosen, Calculus, Adv... | Practice: GFG GATE math PYQs 2014-2...",
        "startDate": "Nov 30-Dec 6",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Revision: Digital Logic + COA",
        "description": "YT: Gate Smashers (recap); Neso Ac... | Book: Morris Mano, Patters... | Practice: GATE DL+COA PYQs 2013-202...",
        "startDate": "Dec 7-Dec 13",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Revision: DS + Algorithms",
        "description": "YT: Abdul Bari (recap playlists); ... | Book: CLRS 4e, Karumanchi ... | Practice: GATE DS+Algo PYQs 2013-20...",
        "startDate": "Dec 14-Dec 20",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Revision: TOC + Compiler Design",
        "description": "YT: Ravindrababu Ravula (recap); G... | Book: Sipser, Dragon Book ... | Practice: GATE TOC+Compiler PYQs 20...",
        "startDate": "Dec 21-Dec 27",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Revision: OS + DBMS",
        "description": "YT: Gate Smashers (recap); Neso Ac... | Book: Silberschatz OS+DB (... | Practice: GATE OS+DBMS PYQs 2010-20...",
        "startDate": "Dec 28-Jan 3",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Revision: CN + GATE DA (ML, AI)",
        "description": "YT: Gate Smashers + Neso (recap); ... | Book: Kurose, Russell & No... | Practice: GATE CN 2010-2023; GATE D...",
        "startDate": "Jan 4-Jan 10",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Full Mock Tests - GATE CS Set 1",
        "description": "YT: Focus areas from mock performa... | Book: GATE syllabus (refer... | Practice: MadeEasy/Testbook full GA...",
        "startDate": "Jan 11-Jan 17",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Full Mock Tests - GATE DA Set 1",
        "description": "YT: Focus areas from mock performa... | Book: GATE DA syllabus (re... | Practice: Testbook GATE DA mocks; G...",
        "startDate": "Jan 18-Jan 24",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Final Intensive Revision",
        "description": "YT: Error analysis from mocks; You... | Book: Weak topic books (re... | Practice: Weak topic PYQs; speed dr...",
        "startDate": "Jan 25-Jan 31",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Exam Prep - Strategy & Light Review",
        "description": "YT: Mock error analysis; strategy ... | Book: Formula sheets (refe... | Practice: Final PYQ speed drills; s...",
        "startDate": "Feb 1-Feb 7",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Final Days - Rest & Focus",
        "description": "YT: Light recap only... | Book: Notes (reference)... | Practice: Rest 2 days; light review...",
        "startDate": "Feb 8-Feb 14",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "GATE 2027 EXAM WEEK",
        "description": "YT: N/A - Exam focus... | Book: N/A... | Practice: GATE 2027 CS & DA Exams...",
        "startDate": "Feb 15-Feb 21",
        "endDate": "",
        "tasks": []
      }
    ]
  },
  {
    "goalName": "Upskill",
    "subGoals": [
      {
        "title": "Computer Networks Pt.1 (Protocols, TCP/IP)",
        "description": "YT: Neso Academy - CN (full); Gate... | Book: Kurose 7e Ch.1-3; Ta... | Practice: GATE CN PYQs 2013-2023; C...",
        "startDate": "Sep 7-Sep 13",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Computer Networks Pt.2 (Routing, DNS, Security)",
        "description": "YT: Neso Academy - CN (cont); Gate... | Book: Kurose Ch.4-6; Tanen... | Practice: GATE CN PYQs (cont); Pack...",
        "startDate": "Sep 14-Sep 20",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Digital Logic + COA Pt.1",
        "description": "YT: Gate Smashers - Digital Logic+... | Book: Morris Mano Digital ... | Practice: GATE DL+COA PYQs 2013-202...",
        "startDate": "Sep 21-Sep 27",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "COA Pt.2 (Pipelining, Memory, Performance)",
        "description": "YT: Gate Smashers - COA (cont); Ne... | Book: Patterson & Hennessy... | Practice: GATE COA PYQs (cont); pip...",
        "startDate": "Sep 28-Oct 4",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Cybersecurity Foundations Pt.1",
        "description": "YT: NetworkChuck - Ethical Hacking... | Book: Erickson Hacking Art... | Practice: TryHackMe Pre-Security pa...",
        "startDate": "Oct 5-Oct 11",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Cybersecurity Intermediate",
        "description": "YT: TCM Security - Practical Ethic... | Book: Web App Hacker's Han... | Practice: TryHackMe Jr Penetration ...",
        "startDate": "Oct 12-Oct 18",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "AI + ML Deep Dive Pt.1 (Neural Nets, DL)",
        "description": "YT: Andrej Karpathy - Neural Netwo... | Book: Goodfellow DL Ch.6,9... | Practice: Kaggle Digit Recognizer (...",
        "startDate": "Oct 19-Oct 25",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "AI + ML Deep Dive Pt.2 (Transformers, Advanced)",
        "description": "YT: Andrej Karpathy - Zero to Hero... | Book: Goodfellow (cont); C... | Practice: Implement bigram LM (Karp...",
        "startDate": "Oct 26-Nov 1",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "System Design Pt.1 (Fundamentals, Scalability)",
        "description": "YT: ByteByteGo (Alex Xu) - YouTube... | Book: System Design Interv... | Practice: Exponent system design pr...",
        "startDate": "Nov 2-Nov 8",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "System Design Pt.2 (Design Interviews, Practice)",
        "description": "YT: ByteByteGo (cont); Gaurav Sen ... | Book: System Design Interv... | Practice: Exponent (cont); LeetCode...",
        "startDate": "Nov 9-Nov 15",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Data Analysis Pt.1 (Pandas, SQL, Visualization)",
        "description": "YT: Alex The Analyst - Pandas+SQL ... | Book: Veerarajan Stats (re... | Practice: Kaggle Pandas micro-cours...",
        "startDate": "Nov 16-Nov 22",
        "endDate": "",
        "tasks": []
      },
      {
        "title": "Data Analysis Pt.2 (Statistical Analysis, Viz)",
        "description": "YT: Alex The Analyst (cont); Corey... | Book: Veerarajan Prob+Stat... | Practice: Complete 2-3 EDA Kaggle n...",
        "startDate": "Nov 23-Nov 29",
        "endDate": "",
        "tasks": []
      }
    ]
  }
];

const MONTHS = {
  'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
  'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
};

function parseDate(dateStr) {
    if (!dateStr) return null;
    let clean = dateStr.replace(/ΓÇö/g, '-').replace(/–/g, '-').split('-')[0].trim();
    const parts = clean.split(' ');
    if (parts.length < 2) return null;
    
    const month = MONTHS[parts[0].substring(0, 3)];
    const day = parseInt(parts[1]);
    
    if (isNaN(day) || month === undefined) return null;
    return { month, day };
}

const goals = [];
const subGoals = [];
const tasks = [];

data.forEach((goalData, gIdx) => {
    const goalId = (gIdx + 1).toString();
    goals.push({
        id: goalId,
        title: goalData.goalName,
        description: `${goalData.goalName} Learning Track`
    });

    let currentYear = 2026;
    let lastMonth = -1;

    goalData.subGoals.forEach((sgData, sgIdx) => {
        const subGoalId = `${goalId}-${sgIdx + 1}`;
        
        let startDateStr = '';
        let endDateStr = '';
        
        const parsedStart = parseDate(sgData.startDate);
        
        if (parsedStart) {
            if (lastMonth !== -1 && parsedStart.month < lastMonth && (lastMonth > 8)) {
                currentYear++;
            }
            lastMonth = parsedStart.month;
            
            const d = new Date(currentYear, parsedStart.month, parsedStart.day);
            startDateStr = d.toISOString().split('T')[0];
            d.setDate(d.getDate() + 6);
            endDateStr = d.toISOString().split('T')[0];
        }

        subGoals.push({
            id: subGoalId,
            goalId: goalId,
            title: sgData.title,
            description: sgData.description,
            startDate: startDateStr,
            endDate: endDateStr
        });

        if (sgData.description) {
            const parts = sgData.description.split('|');
            parts.forEach((part, tIdx) => {
                const trimmed = part.trim();
                let type = '';
                let title = '';
                let duration = '2h';
                
                if (trimmed.startsWith('YT:')) {
                    type = 'video';
                    title = trimmed.substring(3).trim();
                    duration = '1h';
                } else if (trimmed.startsWith('Book:')) {
                    type = 'book';
                    title = trimmed.substring(5).trim();
                    duration = '3h';
                } else if (trimmed.startsWith('Practice:')) {
                    type = 'practice';
                    title = trimmed.substring(9).trim();
                    duration = '2h';
                }
                
                if (title) {
                    tasks.push({
                        id: `${subGoalId}-${tIdx}`,
                        subGoalId: subGoalId,
                        title: `${type.toUpperCase()}: ${title.substring(0, 40)}${title.length > 40 ? '...' : ''}`,
                        description: title,
                        duration: duration,
                        targetEndDate: endDateStr,
                        subtask: '',
                        frequency: 'Once',
                        type: type,
                        status: 'pending',
                        links: [],
                        files: []
                    });
                }
            });
        }
    });
});

const output = `import { Goal, SubGoal, Task } from './storage.service';

const now = new Date().toISOString();

export const SEED_DATA = {
  goals: ${JSON.stringify(goals, null, 2)}.map(g => ({...g, createdAt: now})) as Goal[],
  subGoals: ${JSON.stringify(subGoals, null, 2)}.map(s => ({...s, createdAt: now})) as SubGoal[],
  tasks: ${JSON.stringify(tasks, null, 2)}.map(t => ({...t, createdAt: now})) as Task[]
};
`;

fs.writeFileSync('src/app/services/seed-data.ts', output);
console.log('Seed data updated with new fields.');
