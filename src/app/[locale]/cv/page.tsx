'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth' // Adjust path as needed
import styles from './cv.module.css'
import { COMMON_WORDS } from '../../../../messages/constants'

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
  const { isAuthenticated, isLoading } = useAuth()

  const educationList = Object.values(t.raw('educationList')) as EducationItem[]
  const experienceList = Object.values(
    t.raw('experienceList'),
  ) as ExperienceItem[]
  const projectsList = Object.values(t.raw('projectsList')) as ProjectItem[]

  const renderContactInfo = () => {
    if (isLoading) {
      return (
        <div className={styles.contactInfo}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={styles.cvLocation}>{t('loadingContactInfo')}</p>
        </div>
      )
    }

    if (isAuthenticated) {
      return (
        <div className={styles.contactInfo}>
          <p className={styles.cvLocation}>{t('location')}</p>
          <p className={styles.cvPhone}>{t('phone')}</p>
          <p className={styles.cvEmail}>{t('email')}</p>
          <p className={styles.cvLinks}>
            <a
              href={COMMON_WORDS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('linkedin')}
            </a>
            {' / '}
            <a
              href={COMMON_WORDS.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('portfolio')}
            </a>
            {' / '}
            <a
              href={COMMON_WORDS.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('github')}
            </a>
          </p>
        </div>
      )
    }

    // Not authenticated - show login prompt
    return (
      <div className={styles.contactInfo}>
        <div
          className={`${styles.loginPrompt} bg-blue-50 border border-blue-200 rounded-lg p-4 text-center`}
        >
          <p className="text-blue-800 mb-2">{t('contactInfoMessage')}</p>
          <Link
            href={`/auth?redirect=${encodeURIComponent(window.location.pathname)}`}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {t('loginToViewContact')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.cvContainer}>
      <div className={styles.cvContent}>
        <h1 className={styles.cvTitle}>{t('title')}</h1>

        {renderContactInfo()}

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
