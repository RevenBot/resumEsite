import AboutMe from "./AboutMe/AboutMe";
import Contact from "./Contacts/Contact";
import Memories from "./Projects/Memories";
import Resume from "./Projects/Resume";
import WordleSolver from "./Projects/WordleSolver";
import Skills from "./Skills/Skills";

const frames = [
  {
    id: 1,
    name: "About Me",
    relativeUrl: "about-me",
    bookType: "magicbook",
    region: "topLeft",
    description: "about-me",
    component: AboutMe,
  },
  {
    id: 2,
    name: "Skills",
    relativeUrl: "skills",
    bookType: "oldbook1",
    region: "topLeft",
    description: "skills",
    component: Skills,
  },
  {
    id: 3,
    name: "Contacts",
    relativeUrl: "contacts",
    bookType: "oldbook1",
    region: "topLeft",
    description: "contacts",
    component: Contact,
  },
  {
    id: 4,
    name: "Memories",
    relativeUrl: "project-memories",
    bookType: "book",
    region: "topRight",
    description: "project-memories",
    component: Memories,
  },
  {
    id: 5,
    name: "Wordle Solver",
    relativeUrl: "project-wordlesolver",
    bookType: "book",
    region: "topRight",
    description: "project-wordlesolver",
    component: WordleSolver,
  },
  {
    id: 6,
    name: "Resume",
    relativeUrl: "project-resume",
    bookType: "book",
    region: "topRight",
    description: "project-resume",
    component: Resume,
  },
];

export default frames;
