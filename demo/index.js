import DomConsole from "../src/DomConsole.js";
import Specish from "../src/Specish.js";
import "./Demo.spec.js";
import "../test/Matcher.spec.js";
import "../test/Specish.spec.js";

Specish.defaultInstance.runCurrentSuite(new DomConsole("results"));
Specish.defaultInstance.runCurrentSuite();
