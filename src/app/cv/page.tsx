'use client'

import { useEffect, useState } from 'react'
import styles from './cv.module.css'
import Image from 'next/image'

const translations = {
  en: {
    title: 'Lucas Deletang',
    personalInfo: 'Personal Information',
    email: 'Email: lucas.deletang.legravier@gmail.com',
    location: 'Location: Angers, France',
    // phone: "Phone: +33788698608",
    linkedin:
      '<a href="https://www.linkedin.com/in/lucas-deletang/" target="_blank">Linkedin: lucas-deletang</a>',
    portfolio:
      '<a href="https://lucas.deletang.dev" target="_blank">Portfolio: lucas.deletang.dev</a>',
    github:
      '<a href="https://github.com/LucasDltg" target="_blank">Github: LucasDLTG</a>',
    objective: 'OBJECTIVE',
    objectiveText:
      'Recent graduate in <strong>Data Science</strong> and <strong>Artificial Intelligence</strong> engineering, seeking a <strong>first job</strong> in the field of <strong>Computer Science</strong>, <strong>Data Science</strong>, or <strong>Artificial Intelligence</strong>.',
    education: 'Education',
    educationList: [
      {
        institution: 'Institut Mines Télécom, Strasbourg',
        period: '2022 - 2025',
        degree:
          'Engineering degree in Computer Science and Networks, Data Science and Artificial Intelligence',
      },
      {
        institution: 'University of Strasbourg',
        period: '2023 - 2025',
        degree: "Master's in Data Science and Complex Systems",
      },
      {
        institution: 'CPGE Prytanée National Militaire',
        period: '2020 - 2022',
        degree:
          'Preparatory Classes for Grandes Écoles (CPGE) - Mathematics and Physics',
      },
    ],
    skills: 'Skills and Languages',
    languages:
      'Languages: <strong>French</strong> (Native), <strong>English</strong> (Fluent, C1 (TOEIC)), Spanish (Beginner)',
    programmingLanguages:
      'Programming Languages: <strong>C</strong>, <strong>C++</strong>, <strong>Python</strong>, R, Matlab, <strong>Next.js</strong>, <strong>JavaScript</strong>, HTML, CSS, <strong>React</strong>, Tailwind, <strong>MongoDB</strong>, SQL, Java, C#, .NET, <strong>PyTorch</strong>, Docker, OpenGL, OpenGL ES, git (CI/CD), Kafka, Opensearch, Kubernetes (basic), AI tools',
    skillsList:
      'Skills: <strong>Machine Learning</strong>, <strong>Natural Language Processing</strong>, <strong>Deep Learning</strong>, <strong>RAG</strong>, <strong>AI Agent</strong>, <strong>LLM</strong>, Mathematics',
    softskills:
      'Soft Skills: <strong>Teamwork</strong>, <strong>Leadership</strong>, <strong>Adaptability</strong>, <strong>Intellectual Curiosity</strong>',
    experience: 'Experience',
    experienceList: [
      {
        title: '<strong>Engineering Intern</strong>',
        period: 'March 2025 - August 2025',
        company: '<strong>Thales Alenia Space</strong>, Cannes, France',
        responsibilities: [
          'Created an AI agent using the <strong>Smolagents</strong> framework, enabling agentic RAG and querying a database to answer user questions.',
          'Developed an AI assistant that live-corrects requirements written by engineers based on a predefined rule set.',
        ],
      },
      {
        title: '<strong>Data Science Intern</strong>',
        period: 'May 2024 - August 2024',
        company:
          '<strong>VTEC Lasers & Sensors Ltd</strong>, Eindhoven, Netherlands',
        responsibilities: [
          'Created a <strong>Python application</strong> to visualize CSV files and analyze them using <strong>AI</strong>.',
          'Applied <strong>computer vision techniques</strong> to improve wafer production yield.',
          'Processed and analyzed <strong>time series data</strong> using <strong>Pandas</strong>, <strong>Numpy</strong>, and <strong>Matplotlib</strong>.',
        ],
      },
      {
        title: '<strong>Engineering Project</strong> (LLM Analysis)',
        period: 'Jan 2024 - Feb 2025',
        company: '<strong>Euro Information</strong>, Strasbourg, France',
        responsibilities: [
          'Analyzed <strong>Large Language Models (LLMs)</strong> for instances of sexism.',
          'Developed and implemented <strong>algorithms</strong> to detect biased language in LLM outputs.',
          'Proposed solutions to mitigate <strong>gender bias</strong> in LLMs.',
        ],
      },
    ],
    projects: 'Some Projects',
    projectsList: [
      {
        title: '<strong>Natural Language Processing Project</strong>',
        description:
          'Used <strong>TF-IDF</strong> for feature extraction combined with a <strong>SVM classifier</strong> to achieve over <strong>87%</strong> classification accuracy in topic prediction from sentence data.',
      },
      {
        title:
          '<strong>YOLOv8 Fine-tuning</strong> for License Plate Detection',
        description:
          'Fine-tuned the <strong>YOLOv8 model</strong> to detect car license plates in security camera footage. Achieved <strong>95% accuracy</strong> on a custom dataset, enabling <strong>real-time plate recognition</strong> in varied lighting conditions.',
      },
      {
        title: '<strong>RC Car Control System with Raspberry Pi</strong>',
        description:
          'Developed a system using <strong>Raspberry Pi</strong> to capture input from a car simulator on a computer and send commands to an RC car. Implemented <strong>real-time video feedback</strong> from the RC car to the simulator, creating an immersive remote control experience.',
      },
      {
        title: '<strong>Distributed and Sharded MongoDB Cluster</strong>',
        description:
          'Built a <strong>MongoDB</strong> cluster using <strong>replicaSet</strong> and <strong>sharding</strong> to ensure fault tolerance and efficient data distribution. The project includes a 5-node replicaSet (1 primary, 3 secondaries, 1 arbiter) and partitioned data across multiple shards to simulate a distributed environment capable of handling large volumes and ensuring service continuity in case of failure.',
      },
      {
        title: '<strong>Website Development (in progress)</strong>',
        description:
          'Website with <strong>Firebase authentication</strong>, purchasing functionality via <strong>Stripe</strong>, user data storage in a database, and more.',
      },
    ],
  },
  fr: {
    title: 'Lucas Deletang',
    personalInfo: 'Informations Personnelles',
    email: 'Email: lucas.deletang.legravier@gmail.com',
    location: 'Localisation: Angers, France',
    // phone: "Téléphone: +33788698608",
    linkedin:
      '<a href="https://www.linkedin.com/in/lucas-deletang/" target="_blank">Linkedin: lucas-deletang</a>',
    portfolio:
      '<a href="https://lucas.deletang.dev" target="_blank">Portfolio: lucas.deletang.dev</a>',
    github:
      '<a href="https://github.com/LucasDltg" target="_blank">Github: LucasDLTG</a>',
    objective: 'OBJECTIF',
    objectiveText:
      "Jeune diplômé en ingénierie en <strong>Data Science</strong> et <strong>Intelligence Artificielle</strong>, à la recherche d'un <strong>premier travail</strong> dans le domaine de l'<strong>informatique</strong> / <strong>Data science</strong>, <strong>Intelligence artificielle</strong>.",
    education: 'Formation',
    educationList: [
      {
        institution: 'Institut Mines Télécom, Strasbourg',
        period: '2022 - 2025',
        degree:
          "Diplôme d'ingénieur en informatique et réseaux, Data Science et Intelligence Artificielle",
      },
      {
        institution: 'Université de Strasbourg',
        period: '2023 - 2025',
        degree: 'Master en Data Science et Systèmes Complexes',
      },
      {
        institution: 'CPGE Prytanée National Militaire',
        period: '2020 - 2022',
        degree:
          'Classes préparatoires aux Grandes Écoles (CPGE) - Mathématiques et Physique',
      },
    ],
    skills: 'Compétences et Langues',
    languages:
      'Langues: <strong>Français</strong> (Natif), <strong>Anglais</strong> (Courant, C1 (TOEIC)), Espagnol (Débutant)',
    programmingLanguages:
      'Langages de Programmation: <strong>C</strong>, <strong>C++</strong>, <strong>Python</strong>, R, Matlab, <strong>Next.js</strong>, <strong>JavaScript</strong>, HTML, CSS, <strong>React</strong>, Tailwind, <strong>MongoDB</strong>, SQL, Java, C#, .NET, <strong>PyTorch</strong>, Docker, OpenGL, OpenGL ES, git (CI/CD), Kafka, Opensearch, Kubernetes (bases), outils IA',
    skillsList:
      'Compétences: <strong>Machine Learning</strong>, <strong>Traitement du Langage Naturel</strong>, <strong>Deep Learning</strong>, <strong>RAG</strong>, <strong>Agent IA</strong>, <strong>LLM</strong>, Mathématiques',
    softskills:
      "Softskills : <strong>Travail d'équipe</strong>, <strong>Leadership</strong>, <strong>Adaptabilité</strong>, <strong>Curiosité intellectuelle</strong>",
    experience: 'Expérience',
    experienceList: [
      {
        title: '<strong>Stagiaire Ingénieur</strong>',
        period: 'Mars 2025 - Août 2025',
        company: '<strong>Thales Alenia Space</strong>, Cannes, France',
        responsibilities: [
          "Création d'un agent IA avec le framework <strong>Smolagents</strong> permettant de faire du agentic RAG et interroger une base de données pour répondre à une question utlisateur.",
          "Développement d'un assistant IA corrigeant en direct les requierements écrit par l'ingénieur selon une liste de règles prédéfinies.",
        ],
      },
      {
        title: '<strong>Stagiaire Data Scientist</strong>',
        period: 'Mai 2024 - Août 2024',
        company:
          '<strong>VTEC Lasers & Sensors Ltd</strong>, Eindhoven, Pays-Bas',
        responsibilities: [
          "Création d'une <strong>application Python</strong> pour visualiser les fichiers CSV et les analyser avec l'<strong>IA</strong>.",
          'Application de <strong>techniques de vision par ordinateur</strong> pour améliorer le rendement de production des wafers.',
          'Traitement et analyse de <strong>séries temporelles</strong> en utilisant <strong>Pandas</strong>, <strong>Numpy</strong> et <strong>Matplotlib</strong>.',
        ],
      },
      {
        title: '<strong>Projet Ingénieur</strong> (Analyse des LLMs)',
        period: 'Jan 2024 - Fév 2025',
        company: '<strong>Euro Information</strong>, Strasbourg, France',
        responsibilities: [
          'Analyse des <strong>grands modèles de langage (LLMs)</strong> pour des instances de sexisme.',
          "Développement et mise en œuvre d'<strong>algorithmes</strong> pour détecter le langage biaisé dans les sorties des LLMs.",
          'Proposition de solutions pour atténuer les <strong>biais sexistes</strong> dans les LLMs.',
        ],
      },
    ],
    projects: 'Quelques projets',
    projectsList: [
      {
        title: '<strong>Projet de Traitement du Langage Naturel</strong>',
        description:
          "L'utilisation de <strong>TF-IDF</strong> pour l'extraction de caractéristiques, combinée à un <strong>classificateur SVM</strong>, a permis d'obtenir une précision de classification supérieure à <strong>87%</strong> dans la prédiction des sujets des phrases du dataset.",
      },
      {
        title:
          "<strong>Fine-tuning de YOLOv8</strong> pour la Détection de Plaques d'Immatriculation",
        description:
          "Affinement du <strong>modèle YOLOv8</strong> pour détecter les plaques d'immatriculation des voitures dans les images de caméras de sécurité. Atteint une <strong>précision de 95%</strong> sur un jeu de données personnalisé, permettant une <strong>reconnaissance des plaques en temps réel</strong> dans diverses conditions d'éclairage.",
      },
      {
        title:
          '<strong>Système de Contrôle de Voiture RC avec Raspberry Pi</strong>',
        description:
          "Développement d'un système utilisant <strong>Raspberry Pi</strong> pour capturer les entrées d'un simulateur de voiture sur ordinateur et transmettre les commandes à une voiture RC. Implémentation d'un <strong>retour vidéo en temps réel</strong> de la voiture RC vers le simulateur, créant une expérience immersive de contrôle à distance.",
      },
      {
        title:
          "<strong>Création d'un Cluster MongoDB Réparti et Fragmenté</strong>",
        description:
          "Développement d'un cluster <strong>MongoDB</strong> utilisant la technique de <strong>replicaSet</strong> et de <strong>sharding</strong> pour assurer une tolérance aux pannes et une répartition efficace des données. Le projet inclut la création d'un replicaSet avec 5 nœuds (1 primaire, 3 secondaires, 1 arbitre) ainsi que le partitionnement des données sur plusieurs shards. Cela permet de simuler un environnement distribué capable de gérer des volumes de données importants et d'assurer la continuité du service en cas de panne.",
      },
      {
        title: "<strong>Création d'un site web (en développement)</strong>",
        description:
          "Site web permettant de s'autentifier avec <strong>Firebase</strong>, effectuer des achats avec <strong>Stripes</strong>, stocker les informations utilisateurs dans une base de données, etc",
      },
    ],
  },
}

export default function CV() {
  const [lang, setLang] = useState('fr') // Changed 'en' to 'fr'
  const t = translations[lang as keyof typeof translations]

  useEffect(() => {
    // Example of safely removing an element
    const element = document.getElementById('some-element-id')
    if (element) {
      element.remove()
    }
  }, [])

  return (
    <div className={styles.cvContainer}>
      <div className={styles.cvContent}>
        <div className={styles.languageSelector}>
          <button
            className={styles.languageButton}
            onClick={() => setLang('fr')}
          >
            <Image src="/flag_fr.svg" alt="fr" width={40} height={40} />
          </button>
          <button
            className={styles.languageButton}
            onClick={() => setLang('en')}
          >
            <Image src="/flag_uk.svg" alt="en" width={40} height={40} />
          </button>
        </div>
        <h1 className={styles.cvTitle}>{t.title}</h1>
        <div className={styles.contactInfo}>
          <p className={styles.cvLocation}>{t.location}</p>
          {/* <p className={styles.cvPhone}>{t.phone}</p> */}
          <p className={styles.cvEmail}>{t.email}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: t.linkedin + ' / ' + t.portfolio + ' / ' + t.github,
            }}
            className={styles.cvLinks}
          ></p>
        </div>
        <hr className={styles.sectionDivider} /> {/* Add horizontal line */}
        <section className={styles.cvSection}>
          <h2 className={styles.cvSectionTitle}>{t.objective}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.objectiveText }}></p>
        </section>
        <hr className={styles.sectionDivider} />
        <section className={styles.cvSection}>
          <h2 className={styles.cvSectionTitle}>{t.education}</h2>
          {t.educationList.map((edu, index) => (
            <div key={index}>
              <p>
                <strong>{edu.institution}</strong>{' '}
                <span className={styles.tab}>{edu.period}</span>
              </p>
              <p>{edu.degree}</p>
            </div>
          ))}
        </section>
        <hr className={styles.sectionDivider} />
        <section className={styles.cvSection}>
          <h2 className={styles.cvSectionTitle}>{t.skills}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.languages }}></p>
          <p dangerouslySetInnerHTML={{ __html: t.programmingLanguages }}></p>
          <p dangerouslySetInnerHTML={{ __html: t.skillsList }}></p>
          <p dangerouslySetInnerHTML={{ __html: t.softskills }}></p>
        </section>
        <hr className={styles.sectionDivider} />
        <section className={styles.cvSection}>
          <h2 className={styles.cvSectionTitle}>{t.experience}</h2>
          {t.experienceList.map((exp, index) => (
            <div key={index}>
              <p
                dangerouslySetInnerHTML={{
                  __html: `<strong>${exp.title}</strong> <span class="${styles.tab}">${exp.period}</span>`,
                }}
              ></p>
              <p dangerouslySetInnerHTML={{ __html: exp.company }}></p>
              <ul className={styles.cvList}>
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: resp }}></li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <hr className={styles.sectionDivider} />
        <section className={styles.cvSection}>
          <h2 className={styles.cvSectionTitle}>{t.projects}</h2>
          {t.projectsList.map((proj, index) => (
            <div key={index}>
              <p dangerouslySetInnerHTML={{ __html: proj.title }}></p>
              <p dangerouslySetInnerHTML={{ __html: proj.description }}></p>
              <br />
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
