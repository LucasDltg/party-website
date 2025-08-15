'use client'

import { useTranslations } from 'next-intl'
import styles from './cv.module.css'
import ContactInfoSection from './ContactInfoSection'

interface EducationItem {
  institution: string
  period: string
  degree: string
}

interface ExperienceItem {
  title: string
  period: string
  company: string
  responsibilities: string[]
}

interface ProjectItem {
  title: string
  description: string
}

export default function CV() {
  const t = useTranslations('Cv')
  const educationList = Object.values(t.raw('educationList')) as EducationItem[]
  const experienceList = Object.values(
    t.raw('experienceList'),
  ) as ExperienceItem[]
  const projectsList = Object.values(t.raw('projectsList')) as ProjectItem[]

  return (
    <div className={styles.cvContainer}>
      <div className={styles.cvContent}>
        <h1 className={styles.cvTitle}>{t('title')}</h1>

        <ContactInfoSection />

        <hr className={styles.sectionDivider} />
        <section className={styles.cvSection}>
          <h2 className={styles.cvSectionTitle}>{t('objective')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.raw('objectiveText') }} />
        </section>
        <hr className={styles.sectionDivider} />
        <section className={styles.cvSection}>
          <h2 className={styles.cvSectionTitle}>{t('education')}</h2>
          {educationList.map((edu, index) => (
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
          <h2 className={styles.cvSectionTitle}>{t('skills')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t.raw('languages') }}></p>
          <p
            dangerouslySetInnerHTML={{ __html: t.raw('programmingLanguages') }}
          ></p>
          <p dangerouslySetInnerHTML={{ __html: t.raw('skillsList') }}></p>
          <p dangerouslySetInnerHTML={{ __html: t.raw('softskills') }}></p>
        </section>
        <hr className={styles.sectionDivider} />
        <section className={styles.cvSection}>
          <h2 className={styles.cvSectionTitle}>{t('experience')}</h2>
          {experienceList.map((exp, index) => (
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
          <h2 className={styles.cvSectionTitle}>{t('projects')}</h2>
          {projectsList.map((proj, index) => (
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
