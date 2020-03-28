import DomConsole from "../src/DomConsole.js";
import { runAll } from "../src/Specish.js";
import "./Demo.spec.js";
import "../test/DomConsole.spec.js";
import "../test/Matcher.spec.js";
import "../test/Mock.spec.js";
import "../test/Spec.spec.js";
import "../test/Specish.spec.js";
import "../test/Suite.spec.js";

runAll(new DomConsole("results"));
runAll();
