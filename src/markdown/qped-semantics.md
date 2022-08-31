# Solution Approach Checker Tutorial
This is a quick exemplary tutorial for setting up the Solution Approach Checker in **Quarterfall**.

## Table of Contents
1. [General Information](#solution-general-information)
2. [Used Example](#solution-used-example)
3. [Configuration in Quarterfall](#solution-config)
   1. [Configuration via MASS Configuration web form](#solution-from-website)
   2. [Transferring the Configuration to Quarterfall](#solution-transferring-to-quarterfall)

## <a id="solution-general-information"></a>General Information
The Solution Approach Checker is part of the MASS Checker.
The Solution Approach Checker performs an analysis of the code to check for task requirement violations
and provide feedback to the student if these prerequisites are violated.


## <a id="solution-used-example"></a>Used Example
We will be using this solution as submitted solution from a student
### <a id="solution-class-CalcSum.java"></a>Class `CalcSum.java`

```java
public class CalcSum {

   public int calcSum(int n){
      int result = 0;
      for(int i = 0 ; i <= n ; i++){
         result = result + i;
      }
      return result;
   }
}
```

## <a id="solution-config"></a>Configuration in Quarterfall

First, we need to create a question is Quarterfall. Since students only need to provide a single class, they do not
need to submit multiple files. Instead, we decide to create a "Code question", which includes a text field where students
can immediately enter their solution.  As question text, we enter the following:

````markdown
Create and implement the calcSum method in the CalcSum class that should return the sum of n.
Note: the method must be implemented recursively.

```java
class CalcSum {
    public int calcSum(int n){
        // TODO
    }
}
```

````

For the Programming Lanaguage, select "Java" which will enable proper syntax highlighting in the solution text editor available to the students.
It is a good idea to provide a template for the solution to avoid that students make mistakes. Therefore, we enter the following as the "Template":

```java
class CalcSum {
   public int calcSum(int n){
      // TODO  
   }
}
```

You could select the tab "Solution" in Quarterfall and provide a sample solution that can be shown to students.
But we leave this out for the tutorial.

![Question in Quartefall.](images/solution_qe_question.PNG)



Next, we need to configure the Mass checker. For this purpose, we select the "Feedback" tab and a Code action and a
Cloud check action.
For the basic steps to configure this feedback as well as the parameter values that need to be provided, please refer
to the main [MASS documentation](/mass/documentation)
The specific configuration of the Solution Approach Checker will be explained in this tutorial.


### <a id="solution-from-website"></a>Configuration via MASS Configuration web form
To specify the configuration, we use the [MASS Configuration web form](/mass/configurator).
The above link sends you directly to our configurator where you can configure all the Mass checkers.
But for this tutorial, we only need the Solution Approach Checker. To enable configuring this, select the check box
***Enable Solution Approach Checker*** in the web form.
Now, you should be able to see that ***SOLUTION APPROACH CHECKER*** appears in the blue bar at the top as in the following screenshot.

![Mass configuration web form.](images/solution_web-form-solution-enabled.PNG)

### <a id="solution-configuration-walkthrough"></a>Configuration Walkthrough

Click on ***SOLUTION APPROACH CHECKER*** and the configurator will let you configure this checker.



![Mass configuration web form page for the Style Checker.](images/solution_web-form-empty.PNG)

#### <a id="solution-exclude-by-type"></a>
In this tutorial, we set the method name as “calcSum”, the return type as “int”, enable recursion and 0 for all loop types.

![Mass configuration web form page for the Solution Approach Checker.](images/solution_web-form_dafault_values.PNG)


### <a id="solution-transferring-to-quarterfall"></a>Transferring the Configuration to Quarterfall

The following JSON object has been built which is shown either to the right of the web form or below it:

```json
{
   "styleSelected": false,
   "semanticsSelected": true,
   "coverageSelected": false,
   "classSelected": false,
   "metricsSelected": false,
   "syntax": {
      "level": "BEGINNER"
   },
   "semantic": {
      "semantics": [
         {
            "recursive": true,
            "whileLoop": 0,
            "forLoop": 0,
            "forEachLoop": 0,
            "doWhileLoop": 0,
            "ifElseStmt": -1,
            "returnType": "int",
            "methodName": "calcSum",
            "filePath": ""
         }
      ]
   }
}
```

Lastly, the configuration needs to be transferred to the Cloud check feedback action in Quarterfall.
For this purpose, we can press the "Copy to Clipboard" button below the representation of the JSON object on the web form homepage.
In Quarterfall navigate to the Code feedback action of the question you have created in the beginning of this tutorial.
In this Code action, enter `qf.mass = ` and paste the configuration you have juste copied.
The Quartefall Feedback actions should now look as follows.
(Actually, the JSON object is copied without any pretty-printing consisting of just one line. For better readability of the screenshot, we have inserted newlines and indentation):

![Mass configuration Quarterfall Cloud check action finished.](images/solution_quarterfall-finished.png)