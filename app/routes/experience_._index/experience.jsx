import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { useReducedMotion } from 'framer-motion';
import { useWindowSize } from '~/hooks';
import { Link as RouterLink, useLoaderData } from '@remix-run/react';
import { useState, useEffect } from 'react';
import { formatDate } from '~/utils/date';
import { classes, cssProps } from '~/utils/style';
import styles from './articles.module.css';

function ArticlesPost({ slug, frontmatter, timecode, index }) {
  const [hovered, setHovered] = useState(false);
  const [dateRange, setDateRange] = useState('');
  const reduceMotion = useReducedMotion();
  const { title, abstract, from, to, featured, banner } = frontmatter;

  useEffect(() => {
    const fromDate = from ? formatDate(from) : '';
    const toDate = to ? formatDate(to) : 'Present';
    setDateRange(from ? `${fromDate} - ${toDate}` : toDate);
  }, [from, to]);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <article
      className={styles.post}
      data-featured={!!featured}
      style={cssProps({ delay: index * 100 + 200 })}
    >
      {featured && (
        <Text className={styles.postLabel} size="s">
          Featured
        </Text>
      )}
      {featured && !!banner && (
        <div className={styles.postImage}>
          <Image
            noPauseButton
            play={!reduceMotion ? hovered : undefined}
            src={banner || "/placeholder.svg"}
            placeholder={`${banner.split('.')[0]}-placeholder.jpg`}
            alt=""
            role="presentation"
          />
        </div>
      )}
      <RouterLink
        unstable_viewTransition
        prefetch="intent"
        // to={`/articles/${slug}`}
        className={styles.postLink}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.postDetails}>
          <div aria-hidden className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            {dateRange}
          </div>
          <Heading as="h2" level={featured ? 2 : 4}>
            {title}
          </Heading>
          <Text size={featured ? 'l' : 's'} as="p">
            {abstract}
          </Text>
          <div className={styles.postFooter}>
            <Button secondary iconHoverShift icon="chevron-right" as="div">
              Explore
            </Button>
            <Text className={styles.timecode} size="s">
              {timecode}
            </Text>
          </div>
        </div>
      </RouterLink>
    </article>
  );
}

export async function loader() {
  // This is where you'd fetch your posts data, possibly from a CMS or database
  const posts = [
    {
      slug: 'freelancer-web-services',
      frontmatter: {
        index: 1,
        title: 'Freelancer : Web Services / Design',
        abstract: 'As I started my freelancing journey, I worked on 10+ client projects for medium-scale businesses and designed multiple pages',
        from: '2024-11-02',
        to: '2025-03-15',
        banner: '/static/hello-world-banner.jpg',
      },
      timecode: '5:00',
    },
    {
      slug: 'software-engineer-startup',
      frontmatter: {
        index: 2,
        title: 'Software Engineer at Tech Startup',
        abstract: 'Joined a fast-paced startup, working on cutting-edge web applications and improving my full-stack development skills',
        from: '2025-04-01',
        to: null,
        banner: '/static/startup-banner.jpg',
      },
      timecode: '7:30',
    },
    {
      slug: 'senior-developer',
      frontmatter: {
        index: 3,
        title: 'Senior Developer at Enterprise Company',
        abstract: 'Took on a leadership role, mentoring junior developers and architecting large-scale applications',
        from: '2026-01-15',
        to: null,
        banner: '/static/enterprise-banner.jpg',
      },
      timecode: '10:00',
    },
  ];

  // Explicitly sort posts by index
  const sortedPosts = posts.sort((a, b) => a.frontmatter.index - b.frontmatter.index);

  // Find the featured post (assuming it's marked with featured: true)
  const featured = sortedPosts.find(post => post.frontmatter.featured) || sortedPosts[0];

  return { posts: sortedPosts, featured };
}

export function Articles() {
  const { posts, featured } = useLoaderData();
  const { width } = useWindowSize();
  const singleColumnWidth = 1190;
  const isSingleColumn = width <= singleColumnWidth;

  return (
    <article className={styles.articles}>
      <Section className={styles.content}>
        {!isSingleColumn && (
          <div className={styles.grid}>
            <div className={styles.list}>
              {posts.map(({ slug, frontmatter, timecode }, index) => (
                <ArticlesPost 
                  key={slug} 
                  slug={slug} 
                  frontmatter={frontmatter} 
                  timecode={timecode} 
                  index={frontmatter.index} 
                />
              ))}
            </div>
            <ArticlesPost {...featured} index={-1} />
          </div>
        )}
        {isSingleColumn && (
          <div className={styles.grid}>
            <ArticlesPost {...featured} index={-1} />
            <div className={styles.list}>
              {posts.map(({ slug, frontmatter, timecode }, index) => (
                <ArticlesPost 
                  key={slug} 
                  slug={slug} 
                  frontmatter={frontmatter} 
                  timecode={timecode} 
                  index={frontmatter.index} 
                />
              ))}
            </div>
          </div>
        )}
      </Section>
      <Footer />
    </article>
  );
}

