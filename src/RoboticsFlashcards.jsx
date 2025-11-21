import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Shuffle, School, GraduationCap, Users, Beaker, User, BookOpen } from 'lucide-react';

// --- DATASET ---
const PROFESSORS = [
  // --- STANFORD ---
  {
    id: 'stan-1',
    university: 'Stanford',
    name: 'Karen Liu',
    image: '/professors/stan-1.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Karen Liu?', answer: 'Professor at Stanford. Expert in physics-based simulation and control for humanoids.' },
      { type: 'Research', question: "What is the focus of Karen Liu's research?", answer: "Physics-based simulation, humanoid locomotion, whole-body control, and learning from human motion capture." },
      { type: 'Lab', question: "Which lab is associated with Karen Liu?", answer: "The Movement Lab — Bridges computer animation and robotics." },
      { type: 'Advisor', question: "Who was Karen Liu's PhD advisor?", answer: "Zoran Popović (University of Washington)" },
      { type: 'Student', question: "Notable student work from Karen Liu's group?", answer: "Wenhao Yu (Google DeepMind) — Sim-to-Real transfer." }
    ]
  },
  {
    id: 'stan-2',
    university: 'Stanford',
    name: 'Shuran Song',
    image: '/professors/stan-2.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Shuran Song?', answer: 'Professor at Stanford. Leader in 3D vision and manipulation.' },
      { type: 'Research', question: "What is the focus of Shuran Song's research?", answer: "Visuomotor policy learning, manipulation in unstructured environments, and UMI (Universal Manipulation Interface)." },
      { type: 'Lab', question: "Which lab is associated with Shuran Song?", answer: "REAL (Robotics & Embodied AI Lab)." },
      { type: 'Advisor', question: "Who was Shuran Song's PhD advisor?", answer: "Thomas Funkhouser (Princeton)" },
      { type: 'Student', question: "Notable student work from Shuran Song's group?", answer: "Cheng Chi — 'Diffusion Policy' (Revolutionary action generation method)." }
    ]
  },
  {
    id: 'stan-3',
    university: 'Stanford',
    name: 'Chelsea Finn',
    image: '/professors/stan-3.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Chelsea Finn?', answer: 'Professor at Stanford. Pioneer in Meta-Learning.' },
      { type: 'Research', question: "What is the focus of Chelsea Finn's research?", answer: "Meta-learning (MAML), few-shot learning, and robot adaptation." },
      { type: 'Lab', question: "Which lab is associated with Chelsea Finn?", answer: "IRIS (Intelligence through Robotic Interaction at Scale)." },
      { type: 'Advisor', question: "Who was Chelsea Finn's PhD advisor?", answer: "Pieter Abbeel & Sergey Levine (UC Berkeley)" },
      { type: 'Student', question: "Notable student work from Chelsea Finn's group?", answer: "Annie Xie — 'Learning Latent Plans from Play'." }
    ]
  },
  {
    id: 'stan-4',
    university: 'Stanford',
    name: 'Oussama Khatib',
    image: '/professors/stan-4.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Oussama Khatib?', answer: 'Professor at Stanford. Legend in control theory and haptics.' },
      { type: 'Research', question: "What is the focus of Oussama Khatib's research?", answer: "Operational space control, whole-body coordination, and haptic interaction (OceanOne)." },
      { type: 'Lab', question: "Which lab is associated with Oussama Khatib?", answer: "Stanford Robotics Lab (SRL)." },
      { type: 'Advisor', question: "Who was Oussama Khatib's PhD advisor?", answer: "Sup'Aero Toulouse (France)" },
      { type: 'Student', question: "Notable student work from Oussama Khatib's group?", answer: "Diego Ruspini — Haptic rendering algorithms." }
    ]
  },
  {
    id: 'stan-5',
    university: 'Stanford',
    name: 'Jeannette Bohg',
    image: '/professors/stan-5.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Jeannette Bohg?', answer: 'Professor at Stanford. Expert in perception for manipulation.' },
      { type: 'Research', question: "What is the focus of Jeannette Bohg's research?", answer: "Interactive perception, learning-based grasping, and 3D scene understanding." },
      { type: 'Lab', question: "Which lab is associated with Jeannette Bohg?", answer: "IPRL (Interactive Perception & Robot Learning Lab)." },
      { type: 'Advisor', question: "Who was Jeannette Bohg's PhD advisor?", answer: "Danica Kragic (KTH)" },
      { type: 'Student', question: "Notable work from Jeannette Bohg's group?", answer: "TidyBot — Personalized robot assistance." }
    ]
  },

  // --- BERKELEY ---
  {
    id: 'cal-1',
    university: 'Berkeley',
    name: 'Pieter Abbeel',
    image: '/professors/cal-1.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Pieter Abbeel?', answer: 'Professor at Berkeley. A giant in Robot Learning.' },
      { type: 'Research', question: "What is the focus of Pieter Abbeel's research?", answer: "Deep RL, apprenticeship learning, and foundation models." },
      { type: 'Lab', question: "Which lab is associated with Pieter Abbeel?", answer: "Berkeley Robot Learning Lab (BRLL)." },
      { type: 'Advisor', question: "Who was Pieter Abbeel's PhD advisor?", answer: "Andrew Ng (Stanford)" },
      { type: 'Student', question: "Notable student of Pieter Abbeel?", answer: "John Schulman — Creator of PPO and ChatGPT (RLHF)." }
    ]
  },
  {
    id: 'cal-2',
    university: 'Berkeley',
    name: 'Sergey Levine',
    image: '/professors/cal-2.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Sergey Levine?', answer: 'Professor at Berkeley. Leader in Offline RL.' },
      { type: 'Research', question: "What is the focus of Sergey Levine's research?", answer: "End-to-end visuomotor control, offline RL, and large-scale robotic learning." },
      { type: 'Lab', question: "Which lab is associated with Sergey Levine?", answer: "RAIL (Robotic AI & Learning Lab)." },
      { type: 'Advisor', question: "Who was Sergey Levine's PhD advisor?", answer: "Vladlen Koltun (Stanford)" },
      { type: 'Student', question: "Notable student work from Sergey Levine's group?", answer: "Tuomas Haarnoja — Soft Actor-Critic (SAC)." }
    ]
  },
  {
    id: 'cal-3',
    university: 'Berkeley',
    name: 'Jitendra Malik',
    image: '/professors/cal-3.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Jitendra Malik?', answer: 'Professor at Berkeley. Founding father of Computer Vision.' },
      { type: 'Research', question: "What is the focus of Jitendra Malik's research?", answer: "Computer vision for robotics, 3D scene understanding, and embodied AI." },
      { type: 'Lab', question: "Which lab is associated with Jitendra Malik?", answer: "Berkeley Vision Group." },
      { type: 'Advisor', question: "Who was Jitendra Malik's PhD advisor?", answer: "Tom Binford (Stanford)" },
      { type: 'Student', question: "Notable student of Jitendra Malik?", answer: "Alexei Efros — Professor at Berkeley (Image Quilting)." }
    ]
  },
  {
    id: 'cal-4',
    university: 'Berkeley',
    name: 'Angjoo Kanazawa',
    image: '/professors/cal-4.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Angjoo Kanazawa?', answer: 'Professor at Berkeley. Innovator in 3D/4D reconstruction.' },
      { type: 'Research', question: "What is the focus of Angjoo Kanazawa's research?", answer: "NeRFs, Gaussian Splatting, and articulated object manipulation." },
      { type: 'Lab', question: "Which lab is associated with Angjoo Kanazawa?", answer: "KAIR (Kanazawa AI Research)." },
      { type: 'Advisor', question: "Who was Angjoo Kanazawa's PhD advisor?", answer: "David Jacobs (UMD)" },
      { type: 'Student', question: "Notable student work from Angjoo Kanazawa's group?", answer: "Matt Tancik — Nerfstudio / Luma AI." }
    ]
  },
  {
    id: 'cal-5',
    university: 'Berkeley',
    name: 'Ken Goldberg',
    image: '/professors/cal-5.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Ken Goldberg?', answer: 'Professor at Berkeley. Expert in grasping and automation.' },
      { type: 'Research', question: "What is the focus of Ken Goldberg's research?", answer: "Cloud Robotics, Grasping (Dex-Net), and Surgical Automation." },
      { type: 'Lab', question: "Which lab is associated with Ken Goldberg?", answer: "AUTOLAB." },
      { type: 'Advisor', question: "Who was Ken Goldberg's PhD advisor?", answer: "Matt Mason (CMU)" },
      { type: 'Student', question: "Notable student work from Ken Goldberg's group?", answer: "Jeff Mahler — Dex-Net (Ambi Robotics)." }
    ]
  },

  // --- MIT ---
  {
    id: 'mit-1',
    university: 'MIT',
    name: 'Daniela Rus',
    image: '/professors/mit-1.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Daniela Rus?', answer: 'Director of CSAIL at MIT. Expert in networked/distributed robotics.' },
      { type: 'Research', question: "What is the focus of Daniela Rus's research?", answer: "Distributed robotics, programmable matter, and soft robotics." },
      { type: 'Lab', question: "Which lab is associated with Daniela Rus?", answer: "Distributed Robotics Lab (DRL)." },
      { type: 'Advisor', question: "Who was Daniela Rus's PhD advisor?", answer: "John Hopcroft (Cornell)" },
      { type: 'Student', question: "Notable student of Daniela Rus?", answer: "Mac Schwager — Professor at Stanford." }
    ]
  },
  {
    id: 'mit-2',
    university: 'MIT',
    name: 'Russ Tedrake',
    image: '/professors/mit-2.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Russ Tedrake?', answer: 'Professor at MIT. Expert in underactuated robotics.' },
      { type: 'Research', question: "What is the focus of Russ Tedrake's research?", answer: "Control of underactuated systems, bipedal locomotion, and manipulation." },
      { type: 'Lab', question: "Which lab is associated with Russ Tedrake?", answer: "Robot Locomotion Group." },
      { type: 'Advisor', question: "Who was Russ Tedrake's PhD advisor?", answer: "H. Sebastian Seung (MIT)" },
      { type: 'Student', question: "Notable student work from Russ Tedrake's group?", answer: "Lucas Manuelli — kPAM (Keypoint Affordance Manipulation)." }
    ]
  },
  {
    id: 'mit-3',
    university: 'MIT',
    name: 'Sangbae Kim',
    image: '/professors/mit-3.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Sangbae Kim?', answer: 'Professor at MIT. Creator of the MIT Cheetah.' },
      { type: 'Research', question: "What is the focus of Sangbae Kim's research?", answer: "Bio-inspired robot design and dynamic locomotion." },
      { type: 'Lab', question: "Which lab is associated with Sangbae Kim?", answer: "Biomimetic Robotics Lab." },
      { type: 'Advisor', question: "Who was Sangbae Kim's PhD advisor?", answer: "Mark Cutkosky (Stanford)" },
      { type: 'Student', question: "Notable work from Sangbae Kim's group?", answer: "MIT Cheetah 3 — Blind stair climbing and dynamic bounding." }
    ]
  },
  {
    id: 'mit-4',
    university: 'MIT',
    name: 'Alberto Rodriguez',
    image: '/professors/mit-4.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Alberto Rodriguez?', answer: 'Professor at MIT. Expert in dexterous manipulation.' },
      { type: 'Research', question: "What is the focus of Alberto Rodriguez's research?", answer: "Mechanics of manipulation, grasping, and tactile perception." },
      { type: 'Lab', question: "Which lab is associated with Alberto Rodriguez?", answer: "MCube Lab." },
      { type: 'Advisor', question: "Who was Alberto Rodriguez's PhD advisor?", answer: "Matt Mason (CMU)" },
      { type: 'Student', question: "Notable student work from Alberto Rodriguez's group?", answer: "Nikhil Chavan-Dafle — Prehensile pushing and internal mechanics." }
    ]
  },
  {
    id: 'mit-5',
    university: 'MIT',
    name: 'Pulkit Agrawal',
    image: '/professors/mit-5.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Pulkit Agrawal?', answer: 'Professor at MIT. Focuses on learning for sensorimotor control.' },
      { type: 'Research', question: "What is the focus of Pulkit Agrawal's research?", answer: "Reinforcement learning, curiosity-driven exploration, and dexterous manipulation." },
      { type: 'Lab', question: "Which lab is associated with Pulkit Agrawal?", answer: "Improbable AI Lab." },
      { type: 'Advisor', question: "Who was Pulkit Agrawal's PhD advisor?", answer: "Jitendra Malik (Berkeley)" },
      { type: 'Student', question: "Notable student work from Pulkit Agrawal's group?", answer: "Idan Shenfeld — Curiosity and exploration in RL." }
    ]
  },

  // --- CMU ---
  {
    id: 'cmu-1',
    university: 'CMU',
    name: 'Martial Hebert',
    image: '/professors/cmu-1.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Martial Hebert?', answer: 'Dean of SCS at CMU. Pioneer in 3D computer vision.' },
      { type: 'Research', question: "What is the focus of Martial Hebert's research?", answer: "Computer vision, 3D scene analysis, and perception for autonomous systems." },
      { type: 'Lab', question: "Which lab is associated with Martial Hebert?", answer: "General Robotics, Automation, Sensing and Perception (GRASP) - Alumni/Context." },
      { type: 'Advisor', question: "Who was Martial Hebert's PhD advisor?", answer: "Olivier Faugeras" },
      { type: 'Student', question: "Notable student of Martial Hebert?", answer: "David Fouhey — Professor at NYU/UMich." }
    ]
  },
  {
    id: 'cmu-2',
    university: 'CMU',
    name: 'Chris Atkeson',
    image: '/professors/cmu-2.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Chris Atkeson?', answer: 'Professor at CMU. Known for soft robotics (Baymax inspiration).' },
      { type: 'Research', question: "What is the focus of Chris Atkeson's research?", answer: "Humanoid robotics, soft robotics, and learning from demonstration." },
      { type: 'Lab', question: "Which lab is associated with Chris Atkeson?", answer: "The Robotics Institute (CMU)." },
      { type: 'Advisor', question: "Who was Chris Atkeson's PhD advisor?", answer: "Emilio Bizzi (MIT)" },
      { type: 'Student', question: "Notable student of Chris Atkeson?", answer: "Stefan Schaal — Founding researcher at Google X Robotics." }
    ]
  },
  {
    id: 'cmu-3',
    university: 'CMU',
    name: 'Abhinav Gupta',
    image: '/professors/cmu-3.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Abhinav Gupta?', answer: 'Professor at CMU. Focuses on scaling up robot learning.' },
      { type: 'Research', question: "What is the focus of Abhinav Gupta's research?", answer: "Large-scale visual learning, self-supervised learning, and robot manipulation." },
      { type: 'Lab', question: "Which lab is associated with Abhinav Gupta?", answer: "The Robotics Institute (CMU)." },
      { type: 'Advisor', question: "Who was Abhinav Gupta's PhD advisor?", answer: "Larry Davis (UMD)" },
      { type: 'Student', question: "Notable student of Abhinav Gupta?", answer: "Lerrel Pinto — Professor at NYU." }
    ]
  },
  {
    id: 'cmu-4',
    university: 'CMU',
    name: 'Katerina Fragkiadaki',
    image: '/professors/cmu-4.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Katerina Fragkiadaki?', answer: 'Professor at CMU. Integrates vision and physics.' },
      { type: 'Research', question: "What is the focus of Katerina Fragkiadaki's research?", answer: "Computer vision, physics simulation, and learning for planning." },
      { type: 'Lab', question: "Which lab is associated with Katerina Fragkiadaki?", answer: "The Robotics Institute (CMU)." },
      { type: 'Advisor', question: "Who was Katerina Fragkiadaki's PhD advisor?", answer: "Jitendra Malik (Berkeley)" },
      { type: 'Student', question: "Notable student work from Katerina Fragkiadaki's group?", answer: "Adam Harley — Particle Video / Tracking." }
    ]
  },
  {
    id: 'cmu-5',
    university: 'CMU',
    name: 'Oliver Kroemer',
    image: '/professors/cmu-5.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Oliver Kroemer?', answer: 'Professor at CMU. Expert in contact-rich manipulation.' },
      { type: 'Research', question: "What is the focus of Oliver Kroemer's research?", answer: "Learning for manipulation, multi-modal perception, and grasping." },
      { type: 'Lab', question: "Which lab is associated with Oliver Kroemer?", answer: "Intelligent Autonomous Manipulation Lab." },
      { type: 'Advisor', question: "Who was Oliver Kroemer's PhD advisor?", answer: "Jan Peters" },
      { type: 'Student', question: "Notable work from Oliver Kroemer's group?", answer: "Mohit Sharma — Learning to manipulate with tactile sensing." }
    ]
  },

  // --- GEORGIA TECH ---
  {
    id: 'gt-1',
    university: 'Georgia Tech',
    name: 'Sonia Chernova',
    image: '/professors/gt-1.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Sonia Chernova?', answer: 'Professor at Georgia Tech. Expert in interactive learning.' },
      { type: 'Research', question: "What is the focus of Sonia Chernova's research?", answer: "Semantic reasoning, human-robot interaction, and adjustable autonomy." },
      { type: 'Lab', question: "Which lab is associated with Sonia Chernova?", answer: "RAIL (Robot Autonomy and Interactive Learning)." },
      { type: 'Advisor', question: "Who was Sonia Chernova's PhD advisor?", answer: "Manuela Veloso (CMU)" },
      { type: 'Student', question: "Notable student work from Sonia Chernova's group?", answer: "Angel Daruna — Knowledge graphs for robotics." }
    ]
  },
  {
    id: 'gt-2',
    university: 'Georgia Tech',
    name: 'Dhruv Batra',
    image: '/professors/gt-2.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Dhruv Batra?', answer: 'Professor at Georgia Tech & FAIR. Embodied AI pioneer.' },
      { type: 'Research', question: "What is the focus of Dhruv Batra's research?", answer: "Embodied AI, simulation (Habitat), and vision-and-language navigation." },
      { type: 'Lab', question: "Which lab is associated with Dhruv Batra?", answer: "Georgia Tech / Meta AI (FAIR)." },
      { type: 'Advisor', question: "Who was Dhruv Batra's PhD advisor?", answer: "Tsuhan Chen (Cornell/CMU)" },
      { type: 'Student', question: "Notable student of Dhruv Batra?", answer: "Abhishek Das — Visual Question Answering & Embodied AI." }
    ]
  },
  {
    id: 'gt-3',
    university: 'Georgia Tech',
    name: 'Seth Hutchinson',
    image: '/professors/gt-3.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Seth Hutchinson?', answer: 'Professor at Georgia Tech. Wrote the book on motion planning.' },
      { type: 'Research', question: "What is the focus of Seth Hutchinson's research?", answer: "Motion planning, visual servoing, and soft robotics." },
      { type: 'Lab', question: "Which lab is associated with Seth Hutchinson?", answer: "Institute for Robotics and Intelligent Machines (IRIM)." },
      { type: 'Advisor', question: "Who was Seth Hutchinson's PhD advisor?", answer: "Avinash Kak (Purdue)" },
      { type: 'Student', question: "Notable work from Seth Hutchinson's group?", answer: "Seminal textbooks on Robot Modeling and Control." }
    ]
  },
  {
    id: 'gt-4',
    university: 'Georgia Tech',
    name: 'Matthew Gombolay',
    image: '/professors/gt-4.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Matthew Gombolay?', answer: 'Professor at Georgia Tech. Focuses on human-robot teaming.' },
      { type: 'Research', question: "What is the focus of Matthew Gombolay's research?", answer: "Human-robot teaming, scheduling, and explainable AI (XAI)." },
      { type: 'Lab', question: "Which lab is associated with Matthew Gombolay?", answer: "CORE Robotics Lab." },
      { type: 'Advisor', question: "Who was Matthew Gombolay's PhD advisor?", answer: "Julie Shah (MIT)" },
      { type: 'Student', question: "Notable work from Matthew Gombolay's group?", answer: "Keaton Scherpereel — AI for Exoskeleton control." }
    ]
  },
  {
    id: 'gt-5',
    university: 'Georgia Tech',
    name: 'Sehoon Ha',
    image: '/professors/gt-5.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Sehoon Ha?', answer: 'Professor at Georgia Tech. Expert in legged locomotion.' },
      { type: 'Research', question: "What is the focus of Sehoon Ha's research?", answer: "Sim-to-real, legged robots, and physics-based character animation." },
      { type: 'Lab', question: "Which lab is associated with Sehoon Ha?", answer: "Georgia Tech (School of Interactive Computing)." },
      { type: 'Advisor', question: "Who was Sehoon Ha's PhD advisor?", answer: "Karen Liu (Stanford/Georgia Tech)" },
      { type: 'Student', question: "Notable work from Sehoon Ha's group?", answer: "Sim-to-Real learning for quadruped robots." }
    ]
  },

  // --- MICHIGAN ---
  {
    id: 'umich-1',
    university: 'Michigan',
    name: 'Jessy Grizzle',
    image: '/professors/umich-1.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Jessy Grizzle?', answer: 'Professor at Michigan. The authority on bipedal walking math.' },
      { type: 'Research', question: "What is the focus of Jessy Grizzle's research?", answer: "Underactuated control, hybrid zero dynamics (HZD), and bipedal walking." },
      { type: 'Lab', question: "Which lab is associated with Jessy Grizzle?", answer: "Michigan Robotics (MABEL, MARLO, CASSIE)." },
      { type: 'Advisor', question: "Who was Jessy Grizzle's PhD advisor?", answer: "H.H. Rosenbrock" },
      { type: 'Student', question: "Notable student of Jessy Grizzle?", answer: "Koushil Sreenath — Professor at UC Berkeley." }
    ]
  },
  {
    id: 'umich-2',
    university: 'Michigan',
    name: 'Chad Jenkins',
    image: '/professors/umich-2.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Chad Jenkins?', answer: 'Professor at Michigan. Advocate for AI democratization.' },
      { type: 'Research', question: "What is the focus of Chad Jenkins's research?", answer: "Human-robot interaction, learning from demonstration, and semantic mapping." },
      { type: 'Lab', question: "Which lab is associated with Chad Jenkins?", answer: "Lyman Briggs / Laboratory for Progress (LFP)." },
      { type: 'Advisor', question: "Who was Chad Jenkins's PhD advisor?", answer: "Maja Matarić (USC)" },
      { type: 'Student', question: "Notable student work from Chad Jenkins's group?", answer: "Zhen Zeng — Semantic linking for robot manipulation." }
    ]
  },
  {
    id: 'umich-3',
    university: 'Michigan',
    name: 'Ram Vasudevan',
    image: '/professors/umich-3.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Ram Vasudevan?', answer: 'Professor at Michigan. Expert in optimization and safety.' },
      { type: 'Research', question: "What is the focus of Ram Vasudevan's research?", answer: "Optimization-based control, safety certification, and autonomous driving." },
      { type: 'Lab', question: "Which lab is associated with Ram Vasudevan?", answer: "ROAHM Lab." },
      { type: 'Advisor', question: "Who was Ram Vasudevan's PhD advisor?", answer: "Ruzena Bajcsy & Francesco Borrelli (Berkeley)" },
      { type: 'Student', question: "Notable student of Ram Vasudevan?", answer: "Maani Ghaffari — Professor at Michigan." }
    ]
  },
  {
    id: 'umich-4',
    university: 'Michigan',
    name: 'Dimitra Panagou',
    image: '/professors/umich-4.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Dimitra Panagou?', answer: 'Professor at Michigan. Expert in multi-agent safety.' },
      { type: 'Research', question: "What is the focus of Dimitra Panagou's research?", answer: "Multi-agent systems, control barrier functions, and safe autonomy." },
      { type: 'Lab', question: "Which lab is associated with Dimitra Panagou?", answer: "D-SL (Distributed Aerospace Systems Lab)." },
      { type: 'Advisor', question: "Who was Dimitra Panagou's PhD advisor?", answer: "Kostas Kyriakopoulos (NTUA)" },
      { type: 'Student', question: "Notable student work from Dimitra Panagou's group?", answer: "Joseph Breeden — High relative degree control barrier functions." }
    ]
  },
  {
    id: 'umich-5',
    university: 'Michigan',
    name: 'Shai Revzen',
    image: '/professors/umich-5.jpg',
    cards: [
      { type: 'Bio', question: 'Who is Shai Revzen?', answer: 'Professor at Michigan. Expert in biologically inspired modularity.' },
      { type: 'Research', question: "What is the focus of Shai Revzen's research?", answer: "Biologically inspired robotics, modular robots, and rapid prototyping." },
      { type: 'Lab', question: "Which lab is associated with Shai Revzen?", answer: "BIRDS Lab." },
      { type: 'Advisor', question: "Who was Shai Revzen's PhD advisor?", answer: "Dan Koditschek (UPenn)" },
      { type: 'Student', question: "Notable work from Shai Revzen's group?", answer: "Discovering locomotion gaits for modular robots." }
    ]
  }
];

// Flatten the structure for the flashcard deck
const INITIAL_DECK = PROFESSORS.flatMap(prof =>
  prof.cards.map(card => ({
    ...card,
    id: `${prof.id}-${card.type}`,
    university: prof.university,
    professor: prof.name,
    image: prof.image // Pass the image down
  }))
);

export default function RoboticsFlashcards() {
  const [deck, setDeck] = useState(INITIAL_DECK);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filter, setFilter] = useState('All');

  // Colors map
  const UNIVERSITY_COLORS = {
    'Stanford': { bg: 'bg-red-800', text: 'text-red-800', border: 'border-red-200', badge: 'bg-red-100 text-red-800', hoverBg: 'hover:bg-red-800' },
    'Berkeley': { bg: 'bg-blue-800', text: 'text-blue-800', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800', hoverBg: 'hover:bg-blue-800' },
    'MIT': { bg: 'bg-gray-800', text: 'text-gray-800', border: 'border-gray-200', badge: 'bg-gray-100 text-gray-800', hoverBg: 'hover:bg-gray-800' },
    'CMU': { bg: 'bg-red-700', text: 'text-red-700', border: 'border-red-200', badge: 'bg-red-100 text-red-700', hoverBg: 'hover:bg-red-700' },
    'Georgia Tech': { bg: 'bg-yellow-600', text: 'text-yellow-600', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-800', hoverBg: 'hover:bg-yellow-600' },
    'Michigan': { bg: 'bg-blue-900', text: 'text-blue-900', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-900', hoverBg: 'hover:bg-blue-900' }
  };

  const getCategoryIcon = (type) => {
    switch (type) {
      case 'Research': return <Beaker className="w-4 h-4" />;
      case 'Lab': return <School className="w-4 h-4" />;
      case 'Advisor': return <GraduationCap className="w-4 h-4" />;
      case 'Student': return <Users className="w-4 h-4" />;
      case 'Bio': return <User className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev + 1) % deck.length), 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length), 200);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  const handleFilter = (uni) => {
    setIsFlipped(false);
    setFilter(uni);
    if (uni === 'All') {
      setDeck(INITIAL_DECK);
    } else {
      setDeck(INITIAL_DECK.filter(card => card.university === uni));
    }
    setCurrentIndex(0);
  };

  const handleJumpToProfessor = (profName, uni) => {
    setIsFlipped(false);
    setFilter(uni);

    // Create the deck for this university
    const newDeck = INITIAL_DECK.filter(card => card.university === uni);
    setDeck(newDeck);

    // Find the index of the first card for this professor
    const index = newDeck.findIndex(card => card.professor === profName);
    if (index !== -1) {
      setCurrentIndex(index);
    } else {
      setCurrentIndex(0);
    }
  };

  const currentCard = deck[currentIndex];
  const styles = UNIVERSITY_COLORS[currentCard.university] || UNIVERSITY_COLORS['Stanford'];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 font-sans text-slate-800">

      {/* Header */}
      <div className="w-full max-w-4xl mb-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2 text-slate-900">Robotics Professors</h1>
        <p className="text-slate-500 mb-6">Top 5 Per University: Stanford, Berkeley, MIT, CMU, Georgia Tech, Michigan</p>

        {/* University Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center w-full mb-4">
          <button onClick={() => handleFilter('All')} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${filter === 'All' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 border hover:bg-slate-100'}`}>All</button>
          {Object.keys(UNIVERSITY_COLORS).map(uni => (
            <div key={uni} className="relative group">
              <button
                onClick={() => handleFilter(uni)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${filter === uni ? UNIVERSITY_COLORS[uni].bg + ' text-white' : `bg-white text-slate-600 border hover:text-white ${UNIVERSITY_COLORS[uni].hoverBg}`}`}
              >
                {uni}
              </button>

              {/* Dropdown Menu */}
              <div className="absolute top-[calc(100%-1rem)] left-1/2 transform -translate-x-1/2 pt-4 w-48 hidden group-hover:block z-50">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                  <div className="py-1">
                    {PROFESSORS.filter(p => p.university === uni).map(prof => (
                      <button
                        key={prof.name}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the university filter again if nested (though they are siblings here)
                          handleJumpToProfessor(prof.name, uni);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      >
                        {prof.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={handleShuffle} className="px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-600 border hover:bg-slate-100 flex items-center gap-1 ml-2">
            <Shuffle size={12} /> Shuffle
          </button>
        </div>
      </div>

      {/* Card Container */}
      <div className="relative w-full max-w-xl aspect-[3/2] perspective-1000 cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>

          {/* FRONT */}
          <div className={`absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-xl border-2 ${styles.border} flex flex-col p-8 items-center justify-center text-center select-none`}>
            <div className="absolute top-6 left-6 flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${styles.badge}`}>
                {currentCard.university}
              </span>
            </div>
            <div className="absolute top-6 right-6">
              <span className="flex items-center gap-1 text-xs font-medium text-slate-400 uppercase tracking-wider">
                {getCategoryIcon(currentCard.type)}
                {currentCard.type}
              </span>
            </div>

            {/* Content for Front */}
            <div className="flex flex-col items-center justify-center h-full">
              {/* If it's a Bio card, show the Avatar on the front */}
              {currentCard.type === 'Bio' && (
                <img
                  src={currentCard.image || `https://ui-avatars.com/api/?name=${currentCard.professor.replace(' ', '+')}&background=random&size=128`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${currentCard.professor.replace(' ', '+')}&background=random&size=128`;
                  }}
                  alt={currentCard.professor}
                  className="w-24 h-24 rounded-full mb-4 shadow-md object-cover"
                />
              )}
              <h2 className="text-xl font-semibold text-slate-600 mb-2">{currentCard.professor}</h2>
              <p className="text-2xl font-bold text-slate-900 leading-tight">
                {currentCard.question}
              </p>
            </div>

            <p className="absolute bottom-6 text-sm text-slate-400 font-medium animate-pulse">Click to flip</p>
          </div>

          {/* BACK */}
          <div className={`absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-2xl shadow-xl border-t-8 ${styles.border.replace('border-', 'border-t-').replace('200', '800')} flex flex-col p-8 items-center justify-center text-center select-none`}>
            <div className="flex flex-col items-center justify-center h-full">
              <div className={`w-12 h-12 rounded-full ${styles.badge.split(' ')[0]} flex items-center justify-center mb-6`}>
                {getCategoryIcon(currentCard.type)}
              </div>
              <p className={`text-xl font-medium ${styles.text} leading-relaxed`}>
                {currentCard.answer}
              </p>
            </div>
            <p className="absolute bottom-6 text-sm text-slate-400 font-medium">Tap for question</p>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="w-full max-w-xl mt-8 flex items-center justify-between">
        <button onClick={handlePrev} className="p-3 rounded-full bg-white shadow-md border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600">
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm font-medium text-slate-500">{currentIndex + 1} / {deck.length}</span>
        <button onClick={handleNext} className="p-3 rounded-full bg-white shadow-md border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600">
          <ChevronRight size={24} />
        </button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
}