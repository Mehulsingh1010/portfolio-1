/* eslint-disable react/no-unescaped-entities */
import usesBackgroundPlaceholder from '~/assets/uses-background-placeholder.jpg';
import usesBackground from '~/assets/uses-background.mp4';
import { Footer } from '~/components/footer';
import { Link } from '~/components/link';
import { List, ListItem } from '~/components/list';
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from '~/components/table';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import styles from './uses.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Uses',
    description: 'A list of hardware and software I use to do my thing',
  });
};

export const Uses = () => {
  return (
    <>
      <ProjectContainer className={styles.uses}>
        <ProjectBackground
          src={usesBackground}
          placeholder={usesBackgroundPlaceholder}
          opacity={0.7}
        />
        <ProjectHeader
          title="Uses"
          description="A somewhat comprehensive list of tools, apps, software, and more that I use on a daily basis to design and code things. And yeah, that is a Johnny Mnemonic GIF in the background."
        />

        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Development</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    I use <Link href="https://code.visualstudio.com/">VSCode</Link> as my
                    text editor, with the Tokyo Night theme and Operator Mono as my
                    typeface of choice.
                  </ListItem>
                  <ListItem>
                    Edge is my main browser for both development and general use.
                  </ListItem>
                  <ListItem>
                    <Link href="https://nextjs.org/">Next.Js </Link>and
                    <Link href="https://reactjs.org/"> React</Link> are my front end
                    Javascript libraries of choice. The component-centric mental model is
                    the first thing that truly made sense to me as a developer.
                  </ListItem>
                  <ListItem>
                    For backend, I use Node.js with Express. I’ve tried a few other ones,
                    Node seems to be the perfect match for my style of coding.
                  </ListItem>
                  <ListItem>
                    I use PostgreSQL and MongoDB as my primary database choices, and I
                    decide between SQL and NoSQL based on the project's requirements.
                  </ListItem>
                  <ListItem>
                    If there's a need for a CLI, I prefer using Inngest, and I prefer
                    Drizzle for ORM.{' '}
                  </ListItem>
                  <ListItem>
                    I use Tailwind and ShadCN for styling, leveraging advanced CSS
                    features to design faster. I use ShadCN as my primary component
                    library.{' '}
                  </ListItem>
                  <ListItem>
                    I use Vercel and Netlify for hosting static sites, and Heroku for
                    hosting dynamic sites.{' '}
                  </ListItem>
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Design</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    <Link href="https://www.figma.com">Figma</Link> is my primary tool for
                    UI designs.
                  </ListItem>
                  <ListItem>
                    I use Locomotive and Framer Motion (now called Motion) for animations.
                    Additionally, I like to explore other animation libraries like GSAP or
                    Lottie for more complex or interactive animations, depending on the
                    project requirements.{' '}
                  </ListItem>
                  <ListItem>
                    For any 3D models and video editing I use{' '}
                    <Link href="https://www.blender.org/">Blender</Link>.
                  </ListItem>
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>GenAI and ML</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    Gemini is my preferred choice for LLM models and all AI-related tasks.
                    I find its capabilities to be highly efficient for advanced language
                    processing and generating insightful outputs.
                  </ListItem>
                  <ListItem>
                    I’ve recently started learning machine learning and am diving into its
                    concepts and techniques.
                  </ListItem>
                  
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="m">
              <ProjectSectionHeading>System</ProjectSectionHeading>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHeadCell>Laptop</TableHeadCell>
                    <TableCell>Lenevo ideapad gaming</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Operating system</TableHeadCell>
                    <TableCell>Windows 12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Browser</TableHeadCell>
                    <TableCell>Edge/Chromer</TableCell>
                  </TableRow>
                  
                  <TableRow>
                    <TableHeadCell>Keyboard</TableHeadCell>
                    <TableCell>Aula1591</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Mouse</TableHeadCell>
                    <TableCell>Aula sg</TableCell>
                  </TableRow>
                  
                  
                 
                </TableBody>
              </Table>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
