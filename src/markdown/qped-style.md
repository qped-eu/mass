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
The style checker performs an analysis of the code to check the Java style conventions
and provide feedback to the student if these style conventions are violated.
Although some rules can be customized by the teacher.
Every rule has a default value, so you can pick the rules that you want to edit.


## <a id="style-used-example"></a>Used Example
We will be using this solution as submitted solution from a student
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

First, we need to create a question is Quarterfall. Since students only need to provide a single class, they do not
need to submit multiple files. Instead, we decide to create a "Code question", which includes a text field where students
can immediately enter their solution.  As question text, we enter the following:

````markdown
Create and implement the Method `isTrue` in the Class `Even` which is supposed to return `true` if the passed integer value is an even number.

```java
class Even {
	// TODO
}
```

````

For the Programming Lanaguage, select "Java" which will enable proper syntax highlighting in the solution text editor available to the students.
It is a good idea to provide a template for the solution to avoid that students make mistakes. Therefore, we enter the following as the "Template":

```java
class Even {
   // TODO
}
```

You could select the tab "Solution" in Quarterfall and provide a sample solution that can be shown to students.
But we leave this out for the tutorial.

![Question in Quartefall.](images/style_qe_question.PNG)



Next, we need to configure the Mass checker. For this purpose, we select the "Feedback" tab and a Code action and a
Cloud check action.
For the basic steps to configure this feedback as well as the parameter values that need to be provided, please refer
to the main [MASS documentation](/mass/documentation)
The specific configuration of the Style Checker will be explained in this tutorial.


### <a id="style-from-website"></a>Configuration via MASS Configuration web form
To specify the configuration, we use the [MASS Configuration web form](/mass/configurator).
The above link sends you directly to our configurator where you can configure all the Mass checkers.
But for this tutorial, we only need the Style Checker. To enable configuring this, select the check box
***Enable Style Checker*** in the web form.
Now, you should be able to see that ***STYLE CHECKER*** appears in the blue bar at the top as in the following screenshot.

![Mass configuration web form.](images/style_web-form-style-enabled.PNG)

### <a id="style-configuration-walkthrough"></a>Configuration Walkthrough

Click on ***STYLE CHECKER*** and the configurator will let you configure this checker.



![Mass configuration web form page for the Style Checker.](images/style_web-form-empty.PNG)

#### <a id="style-exclude-by-type"></a> 
In this tutorial, we set the default values for the Style Checker configurations.

![Mass configuration web form page for the Style Checker.](images/style_web-form_dafault_values.PNG)


### <a id="style-transferring-to-quarterfall"></a>Transferring the Configuration to Quarterfall

The following JSON object has been built which is shown either to the right of the web form or below it:

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

Lastly, the configuration needs to be transferred to the Cloud check feedback action in Quarterfall.
For this purpose, we can press the "Copy to Clipboard" button below the representation of the JSON object on the web form homepage.
In Quarterfall navigate to the Code feedback action of the question you have created in the beginning of this tutorial.
In this Code action, enter `qf.mass = ` and paste the configuration you have juste copied.
The Quartefall Feedback actions should now look as follows.
(Actually, the JSON object is copied without any pretty-printing consisting of just one line. For better readability of the screenshot, we have inserted newlines and indentation):

![Mass configuration Quarterfall Cloud check action finished.](images/style_quarterfall-finished.png)












