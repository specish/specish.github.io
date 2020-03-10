import DomConsole from "../src/DomConsole.js";
import { runSuite } from "../src/Specish.js";
import "./Demo.spec.js";
import "../test/DomConsole.spec.js";
import "../test/Matcher.spec.js";
import "../test/RootSuite.spec.js";
import "../test/Spec.spec.js";
import "../test/Specish.spec.js";
import "../test/Suite.spec.js";

runSuite(new DomConsole("results"));
runSuite();
