![Logo of the QPED project.](images/qped-banner.png)

# MASS: The QPED Feedback Tools for Java

The Marburg university Auto Assess System (MASS) performs checks on
student solutions to programming assignments in the Java language, with
respect to different aspects: syntax, style, solution approach, testing
and design. Only the syntax check is mandatory, all other checks are
optional. In this configuration, lectures can specify which checks
that want to be performed on student solutions and configure these
checks according to the requirements of their assignment.

This page is concerned with the usage of the MASS feedback tools is as
an integration into the Quaterfall platform using its "Cloud Check" mechanism.
For further information on the MASS project and how to use it from other
Learning Management Systems, please refer to our [GitHub repository](https://github.com/Alucard2112/QPED-O3).

## Enabling MASS in Quarterfall

To use MASS in Quarterfall, you must create a question and add two feedback
actions. For this purpose, in Quarterfall's question designer you must open
the tab "Feedback" and first add a Code action, then a Cloud Check action.
The Code action will contain the configuration for MASS, which will be detailed
below. The Cloud Check action must be configured as follows:

| property            | value                                  |
|---------------------|----------------------------------------|
| Git url             | https://github.com/qped-eu/MASS-checker|
| Git branch          | master                                 |
| Path                |                                        |
| Git private SSH key |                                        |

![Screenshot of configuring the MASS Cloud Check in Quarterfall.](images/quarterfall-cloudcheck.png)

The MASS feedback tools are configured using a JSON object and this object is
passed to MASS via the Code action. For this purpose enter JavaScript code there,
in the form ```qf.mass = {}```, whereby you must replace ```{}``` with the JSON object
containing the configuration details.

To generate this JSON object, you can use our [MASS Configuration web form](index.html?tab=config).

We also provide a full [documentation of the MASS configuration JSON object](index.html?tab=doku).

## Tutorials

To get started, please try the tutorials for our different MASS feedback tools:

* [Syntax Checker](index.html?tab=tuts&tut=syntax)
* [Style Checker](index.html?tab=tuts&tut=style)
* [Solution Approach Checker](index.html?tab=tuts&tut=semantic)
* [Test Coverage Checker](index.html?tab=tuts&tut=coverage)
* [Metrics Checker](index.html?tab=tuts&tut=design)
* [Complexity Checker](index.html?tab=tuts&tut=class)

---

The [Marburg university Auto Assess System (MASS)](http://qped-eu.github.io/mass) is part of the project [Quality-focussed Programming Education (QPED)](https://qped.eu), co-funded by the [Erasmus+-Program of the European Union](https://erasmus-plus.ec.europa.eu) (QPED 2020-1-NL01-KA203-064626).

## QPED Partners

![Logos of the partners in the QPED project are Phillip-University of Marburg, Germany;
Open University of the Netherlands; Technical University of Eindhoven, The Netherlands;
Open University of Catalonia, Spain; Quarterfall, The Netherlands. QPED is co-funded by the Erasmus+ Programme of the European Union under the project number
QPED 2020-1-NL01-KA203-064626.](images/partners.png)