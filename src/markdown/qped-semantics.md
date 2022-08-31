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















# Solution Approach Checker Tutorial
This is a quick exemplary tutorial for setting up the Solution Approach Checker in **Quarterfall**.
## Table of Contents
1. [General Information](#solution-general-information)
2. [Used Example](#solution-used-example)
   1. [Class Bag.java](#solution-class-bag.java)
   2. [Class Mapper.java](#solution-class-mapper.java)

## <a id="solution-general-information"></a>General Information

The settings should be added to the qf.mass object and named semantic.
You can find and build the JSON settings with the JSON schema website.
In this tutorial, we will be handling an example with specific settings for this particular example.

## <a id="solution-used-example"></a>Used Example
As an example, we will be using a project with two different classes listed below.
### <a id="solution-class-bag.java"></a>Class `Bag.java`

```java
package ..  
  
public class Bag {  
 
 private String price;  
 public void setPrice(String price) {  
        this.price = price;  
  }  
  
 public int calcRec(int rec) {  
        if (rec <= 0) return 1;  
        else return calcRec(rec - 1);  
  }  
  
 public void calcPrice(int loop){  
        while (loop > 5){  
            if (loop > 2){  
                System.out.println(loop);  
				loop--;  
			}  else if (loop > 3){  
                System.out.println(loop);  
			    loop--  
            }  else {  
                loop--;  
			 }  
        }  
    }  
  
    public Bag(String price) {  
        this.price = price;  
  }  
  
    public String getPrice() {  
        return price;  
  }  
}
```
### <a id="solution-class-mapper.java"></a>Class `Mapper.java`
```java
package ..  

public class Mapper {  
  
private String value;    
 public boolean map(int help) {  
  if (help < 10) return  true;  
 else if (help < 10) return  true;  
 else if (help < 9) return  true;  
 else if (help < 8) return  true;  
 else if (help < 7) return  true;  
 else if (help < 6) return  true;  
 else if (help < 5) return  true;  
 else if (help < 4) return  true;  
 else if (help < 3) return  true;  
 else return false;  }  
  
 public void setValue(String value) {  
        this.value = value;  
 }  
  
 public String getValue() {  
        return value;  
 }  
  
 public Mapper(String value) {  
        this.value = value;  
 }  
}
```

The settings we are using are intended to prevent students from using while loops in the first class
``Bag.java`` and from using recursion in the second class ``Mapper.java``
```json
{
"semantic"  :  [
    {
        "filePath":  "test-project/test-project/src/model/Bag.java",
        "methodName":  "calcPrice",
        "returnType"  :  "void",
        "whileLoop":  0
    },
    {
        "filePath":  "test-project/test-project/src/model/Bag.java",
        "methodName":  "calcRec",
        "returnType"  :  "int",
        "recursionAllowed":  false
    }
  ]
}
```
After the settings are defined, students have to upload the answer in Quarterfall and wait for a feedback.
The feedback should look similar to this:

![semantic Feedback ](images/semantic_Feedback.png)
