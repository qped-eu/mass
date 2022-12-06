![Logo of the QPED project.](images/qped-banner.png)

# MASS: The QPED Feedback Tools for Java

The Marburg university Auto Assess System (MASS) performs checks on student solutions to programming assignments in the Java language, with respect to different aspects: syntax, style, solution approach, testing and design.
Only the syntax check is mandatory, all other checks are optional.
When using MASS, lecturers can configure at a fine-granularity which checks they want to be performed on student solutions and configure these checks according to the requirements of their assignment.

This page is concerned with the usage of the MASS feedback tools as an integration into the Quaterfall platform using its *Cloud Check* mechanism.
For further information on the MASS project and how to use it from other Learning Management Systems, please refer to our [GitHub repository](https://github.com/qped-eu/MASS-checker).

## Enabling MASS in Quarterfall

To use MASS in Quarterfall, you must first create a question, which is either of type *Code question* or *File upload question*.
Next, in Quarterfall's question designer you must open the tab titled *Feedback*.
There you will need to add a *Code Action* in which we will be able to configure MASS.

The MASS feedback tools are configured using a JSON object and this object is passed to MASS via the Code action.
For the configuration, we need to enter some Javascript code here.
We use a JSON object that contains all the relevant information.

To generate this JSON object, you can use our [MASS Configuration web form](/configurator).
It allows to configure all our Checkers and generates the appropriate JSON object for the configuration.
This is shown in the right column *Configuration Data* and using the *Copy to Clipboard* button the configuration will be copied to the clipboard.  
Using the button, you can just paste everything into the aforementioned *Code Action*.
Should you choose to manually copy the JSON object, you need to add *qf.mass =* in front of the JSON object in order for the configuration to work.
![Screenshot of the MASS Configuration web form.](images/mass_web-config.png)

We also provide a full [documentation of the MASS configuration JSON object](/documentation).
In each case, the Syntax Checker must be configured by selecting the student level.
This specifies the experience of students who are supposed to solve the assignment and determines
the level of detail provided by our Syntax Checker for compiler error messages.
For the configuration of the other Checkers, should you want to use them for your assignment, please refer to the specific tutorials (see below).
The minimal code to be placed into the *Code Action* can be seen here:

```javascript
qf.mass = {
  "styleSelected": false,
  "semanticsSelected": false,
  "coverageSelected": false,
  "classSelected": false,
  "metricsSelected": false,
  "syntax": {
    "level": "BEGINNER"
  }
}
```

After adding the configuration within the *Code Action*, we need to add MASS to Quarterfall.
This can be done by using the *Cloud Check* feature of Quarterfall.
Add a *Cloud Check Action* below the *Code Action*.
Within that *Cloud Check Action*, you need to expand the options by clicking on *ADVANCED OPTIONS* in the bottom right of the *Cloud Check Action*.
Input the following data:

| property            | value                                      |
|---------------------|--------------------------------------------|
| Git url             | https://github.com/qped-eu/MASS-checker.git|
| Git branch          | qf                                         |
| Path                |                                            |
| Git private SSH key |                                            |

If you have done everything as described above, your feedback tab should look something like this:

![Screenshot of the Code Action in Quarterfall.](images/quarterfall_code-action-minimal.png)
![Screenshot of the Cloud Check Action in Quarterfall.](images/quarterfall_cloudcheck-action.png)

## Tutorials

To get started, please try the tutorials for our different MASS feedback tools:

<!-- * [Syntax Checker](index.html?tab=tuts&tut=syntax) -->
* [Style Checker](/style)
* [Solution Approach Checker](/semantics)
* [Test Coverage Checker](/coverage)
* [Metrics Checker](/metrics)
* [Complexity Checker](/class)

---

The [Marburg university Auto Assess System (MASS)](http://qped-eu.github.io/mass) is part of the project [Quality-focussed Programming Education (QPED)](https://qped.eu), co-funded by the [Erasmus+-Program of the European Union](https://erasmus-plus.ec.europa.eu) (QPED 2020-1-NL01-KA203-064626).

## QPED Partners

![Logos of the partners in the QPED project are Phillip-University of Marburg, Germany;
Open University of the Netherlands; Technical University of Eindhoven, The Netherlands;
Open University of Catalonia, Spain; Quarterfall, The Netherlands. QPED is co-funded by the Erasmus+ Programme of the European Union under the project number
QPED 2020-1-NL01-KA203-064626.](images/partners.png)