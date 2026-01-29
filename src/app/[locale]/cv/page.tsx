'use client'

import { useTranslations, useLocale } from 'next-intl'
import styles from './cv.module.css'
import ContactInfoSection from './ContactInfoSection'
import { useState, useEffect } from 'react'

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
  const locale = useLocale()

  const specializedKeys = Object.keys(t.raw('Specialized'))
  const [selectedCV, setSelectedCV] = useState(specializedKeys[0])

  const educationList = Object.values(
    t.raw('Common.educationList'),
  ) as EducationItem[]
  const experienceList = Object.values(
    t.raw('Common.experienceList'),
  ) as ExperienceItem[]
  const projectsList = Object.values(
    t.raw(`Specialized.${selectedCV}.projectsList`),
  ) as ProjectItem[]

  // Change name on print
  useEffect(() => {
    const originalTitle = document.title

    const handleBeforePrint = () => {
      document.title = `CV_Lucas_Deletang_${selectedCV}_${locale}`
    }

    const handleAfterPrint = () => {
      document.title = originalTitle
    }

    window.addEventListener('beforeprint', handleBeforePrint)
    window.addEventListener('afterprint', handleAfterPrint)

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint)
      window.removeEventListener('afterprint', handleAfterPrint)
    }
  }, [selectedCV, locale])

  return (
    <div className={styles.cvContainer}>
      <div className={styles.cvContent}>
        <div className={styles.cvHeader}>
          <h1 className={styles.cvTitle}>{t('Common.title')}</h1>
          <select
            className={styles.cvSelector}
            value={selectedCV}
            onChange={(e) => setSelectedCV(e.target.value)}
          >
            {specializedKeys.map((key) => (
              <option key={key} value={key}>
                {t(`Specialized.${key}.title`)}
              </option>
            ))}
          </select>
        </div>

        <ContactInfoSection />

        <hr className={styles.sectionDivider} />
        <section className={styles.cvSection}>
          <h2 className={styles.cvSectionTitle}>{t('Common.objective')}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: t.raw(`Specialized.${selectedCV}.objectiveText`),
            }}
          />
        </section>
        <hr className={styles.sectionDivider} />
        <section className={styles.cvSection}>
          <h2 className={styles.cvSectionTitle}>{t('Common.education')}</h2>
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
          <h2 className={styles.cvSectionTitle}>{t('Common.skills')}</h2>
          <p
            dangerouslySetInnerHTML={{ __html: t.raw('Common.languages') }}
          ></p>
          <p
            dangerouslySetInnerHTML={{
              __html: t.raw(`Specialized.${selectedCV}.programmingLanguages`),
            }}
          ></p>
          <p
            dangerouslySetInnerHTML={{
              __html: t.raw(`Specialized.${selectedCV}.skillsList`),
            }}
          ></p>
          <p
            dangerouslySetInnerHTML={{
              __html: t.raw(`Specialized.${selectedCV}.softskills`),
            }}
          ></p>
        </section>
        <hr className={styles.sectionDivider} />
        <section className={styles.cvSection}>
          <h2 className={styles.cvSectionTitle}>{t('Common.experience')}</h2>
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
          <h2 className={styles.cvSectionTitle}>{t('Common.projects')}</h2>
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
