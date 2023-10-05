import styles from '@/styles/Heading.module.css'

export const Heading = ({ showExplain = false }) => {
  return (
    <div className={styles.heading}>
      <h2 className={styles.title}>CogniCraft</h2>
      <h2>AI generated NFTs</h2>

      {showExplain && (
        <p className={styles.explain}>
          Generate creative images and turn them into NFTs <br />
          using{' '}
          <a
            className={styles.link}
            href='https://openai.com/dall-e-2'
            target='_blank'
            rel='noopener noreferrer'
          >
            OpenAI DALL·E 2
          </a>
          .{' '}
        </p>
      )}
    </div>
  )
}
