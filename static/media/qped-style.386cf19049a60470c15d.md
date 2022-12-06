# Style Checker Tutorial
This is a quick exemplary tutorial for setting up the Style Checker in **Quarterfall**.

## Table of Contents
1. [General Information](#style-general-information)
2. [Used Example](#style-used-example)
3. [Configuration in Quarterfall](#style-config)
   1. [Configuration via MASS Configuration web form](#style-from-website)
   2. [Transferring the Configuration to Quarterfall](#style-transferring-to-quarterfall)

## <a id="style-general-information"></a>General Information

The Style Checker is part of the MASS Checker.
It performs an analysis of the code to check the Java style conventions and provides feedback to the student if these style conventions are violated.
Furthermore, it is possible to customize the ruleset used for analyzation.
Every rule has a default value, so you can pick the rules that you want to edit.


## <a id="style-used-example"></a>Used Example
Throughout this tutorial, we will be using the following example solution:
### <a id="style-class-bag.java"></a>Class `Even.java`

```java
class Even {
   public boolean IsTrue(int num) {
      if (num % 2 == 0) {
         return true;
      } else {
         return false;
      }
   }
}
```

## <a id="style-config"></a>Configuration in Quarterfall

First, we need to create a question in Quarterfall.
Because this example only concerns itself with one class, students will not need to submit multiple files.
Instead, we decide to create a "Code question", which includes a text field where students can immediately enter their solution.

As question text, we enter the following:

````markdown
Create and implement the Method `isTrue` in the Class `Even` which is supposed to return `true` if the passed integer value is an even number.

```java
class Even {
	// TODO
}
```

````

For the Programming Lanaguage, select "Java" which will enable proper syntax highlighting in the solution text editor available to the students.
Depending on the level the students are at, it may be a good idea to provide a template in order to avoid a falsely named class or method.

Therefore, we provide the student with the following as the "Template":

```java
class Even {
   // TODO
}
```

It is possible to select the tab "Solution" in Quarterfall and provide a sample solution that can be shown to students.
For this particular tutorial, we will not be using this feature.

![Question in Quartefall.](images/style_qe_question.PNG)

Next, we need to configure the Mass checker.
Firstly, we need to select the "Feedback" tab and add a Code action and a Cloud check action.
For the basic configuration steps for feedback as well as the parameter values that need to be provided, please refer to the main [MASS documentation](/documentation).
The specific configuration of the Solution Approach Checker will be explained in this tutorial.


### <a id="style-from-website"></a>Configuration via MASS Configuration web form
To configure tbe Solution Approach Checker, we use our [MASS Configuration web form](/configurator).
The above link sends you directly to our configurator where you can configure all the Mass checkers.
For this tutorial, we only need the Style Checker.
If you want to configure any other checker, please refer to their respective tutorial.
To enable configuring this, select the check box ***Enable Style Checker*** in the web form.
After checking the check box, you should be able to see that ***STYLE CHECKER*** appears in the blue bar at the top as in the following screenshot.

![Mass configuration web form.](images/style_web-form-style-enabled.PNG)

### <a id="style-configuration-walkthrough"></a>Configuration Walkthrough

Click on ***STYLE CHECKER*** inside the blue bar at the top of the configurator and you will be able to easily configure the Style Checker:

![Mass configuration web form page for the Style Checker.](images/style_web-form-empty.PNG)

#### <a id="style-exclude-by-type"></a> 
For this tutorial, we will be using the default values provided by the configurator.
Under "Naming Conventions Level" select "BEGINNER" and default values will automatically be filled in for the rest of the values.

![Mass configuration web form page for the Style Checker.](images/style_web-form_dafault_values.PNG)

### <a id="style-transferring-to-quarterfall"></a>Transferring the Configuration to Quarterfall

After configuring our checker, we can copy our configuration as a JSON object from the web form.
You may find the finished configuration in the grey area next to or below of the configuration tool.

Following our example, your JSON object should look like this:

```json
{
   "styleSelected": true,
   "semanticsSelected": false,
   "coverageSelected": false,
   "classSelected": false,
   "metricsSelected": false,
   "syntax": {
      "level": "BEGINNER"
   },
   "style": {
      "basisLevel": "BEGINNER",
      "complexityLevel": "BEGINNER",
      "namesLevel": "BEGINNER",
      "classLength": -1,
      "methodLength": -1,
      "cyclomaticComplexity": -1,
      "fieldsCount": -1,
      "variableNamePattern": "[a-z][a-zA-Z0-9]*",
      "methodNamePattern": "[a-z][a-zA-Z0-9]*",
      "classNamePattern": "[A-Z][a-zA-Z0-9_]*"
   }
}
```

All we need to do now is copying the JSON object over to Quarterfall.
You can either select the JSON object using your mouse and copy it that way or you can use the "Copy to Clipboard" button for your convenience.
If you successfully copied the JSON object, you'll need to navigate to the Code feedback action of the question you have created previously.
In this Code action, enter `qf.mass = ` and paste the configuration you just copied.

The Quartefall Feedback actions should now look like this (depending on your method of copying, the JSON object may have not been copied with indentations or line breaks, so we included these for better readability):

![Mass configuration Quarterfall Cloud check action finished.](images/style_quarterfall-finished.png)
![Screenshot of the Cloud Check Action in Quarterfall.](images/quarterfall_cloudcheck-action.png)












