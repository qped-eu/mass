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
The Solution Approach Checker performs an analysis of the code to check for task requirement violations and provides the student with feedback if these prerequisites are violated.


## <a id="solution-used-example"></a>Used Example
Throughout this tutorial, we will be using the following example solution:
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

First, we need to create a question in Quarterfall.
Because this example only concerns itself with one class, students will not need to submit multiple files.
Instead, we decide to create a "Code question", which includes a text field where students can immediately enter their solution. 
As question text, we enter the following:

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
Depending on the level the students are at, it may be a good idea to provide a template in order to avoid a falsely named class or method.
Therefore, we enter the following as the "Template":

```java
class CalcSum {
   public int calcSum(int n){
      // TODO  
   }
}
```

It is possible to select the tab "Solution" in Quarterfall and provide a sample solution that can be shown to students.
For this particular tutorial, we will not be using this feature.

![Question in Quartefall.](images/solution_qe_question.PNG)



Next, we need to configure the Mass checker.
Firstly, we need to select the "Feedback" tab and add a Code action and a Cloud check action.
For the basic configuration steps for feedback as well as the parameter values that need to be provided, please refer to the main [MASS documentation](/documentation).
The specific configuration of the Solution Approach Checker will be explained in this tutorial.


### <a id="solution-from-website"></a>Configuration via MASS Configuration web form
To configure tbe Solution Approach Checker, we use our [MASS Configuration web form](/configurator).
The above link sends you directly to our configurator where you can configure all the Mass checkers.
For this tutorial, we only need the Solution Approach Checker.
If you want to configure any other checker, please refer to their respective tutorial.
For the configuration to be enabled, you'll need to select the check box ***Enable Solution Approach Checker*** within the web form.
After checking the check box, you should be able to see that ***SOLUTION APPROACH CHECKER*** appears in the blue bar at the top.
Your web form should look something like this:

![Mass configuration web form.](images/solution_web-form-solution-enabled.PNG)

### <a id="solution-configuration-walkthrough"></a>Configuration Walkthrough

Click on ***SOLUTION APPROACH CHECKER*** and the configurator will let you configure this checker.



![Mass configuration web form page for the Style Checker.](images/solution_web-form-empty.PNG)

#### <a id="solution-exclude-by-type"></a>
After enabling the configuration for the Solution Approach checker, we now want to configure the method we want to analyze.
We want to analyze the "calcSum" method, so we need to write that down under "Method Name".
Furthermore, the return type of this method is supposed to be "int".
So we fill that in under "Method Return Type".
Lastly, we want to make sure, that this method is implemented recursively.
To accomplish this, we set the number allowed to 0 for every of the loops.
In this case, we don't want to limit the number of "if"-statements, so we set the value to "-1".

![Mass configuration web form page for the Solution Approach Checker.](images/solution_web-form_dafault_values.PNG)


### <a id="solution-transferring-to-quarterfall"></a>Transferring the Configuration to Quarterfall
After configuring our checker, we can copy our configuration as a JSON object from the web form.
You may find the finished configuration in the grey area next to or below of the configuration tool.
Following our example, your JSON object should look like this:

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

All we need to do now is copying the JSON object over to Quarterfall.
You can either select the JSON object using your mouse and copy it that way or you can use the "Copy to Clipboard" button for your convenience.
If you successfully copied the JSON object, you'll need to navigate to the Code feedback action of the question you have created previously.
In this Code action, enter `qf.mass = ` and paste the configuration you just copied.
The Quartefall Feedback actions should now look as follows.
(Actually, the JSON object is copied without any pretty-printing consisting of just one line. For better readability of the screenshot, we have inserted newlines and indentation):

![Mass configuration Quarterfall Cloud check action finished.](images/solution_quarterfall-finished.png)