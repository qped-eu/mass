# Coverage Checker Tutorial

In this tutorial you will learn how to configure the coverage checker.
There for we will configure feedback for following assignment.

## Assignment:
```
private class Even {
	public boolean isTrue(int num) {
		if (num%2 == 0) {
			return true;
		} else {
			return false;
		}
	}	
}
```

The assignment is to write tests for the **Even** class.
We will generate feedback for following case:

- a test case fails
- the answer only tested an even number
- the answer only tested an uneven number


## Configuration:
The first step is to add following link in to the **Cloud Check**:
```
https://github.com/Alucard2112/QPED-O3.git
```

After this step we can start to configure the coverage checker.
The checker uses a json format for this purpose.
There are two ways to generate this files.
The first one is to manually write them info the field:

![Quarterfall conf.](images/cov_cloud-check-conf.png)


Lucky you can use this Tool on this homepage  to generate your configurations files.

[HOMEPAGE ](https://qped-eu.github.io/mass/index.html)

You should see a page locking similar to this screenshot.

![TOOL_INDEX.](images/cov_homepage.png)

This is the starting page of the tool.
On the left side you can see a button called 
"O3 Configurator". 
After pressing this button 
you can see all shared properties of different tools and
how thay can be configured.

```
COVERAGE CHECKER CONFIGURATION
```

You should now see the following properties:

- **conSetting**
    - **feedback**
    - **additional**


In the next step we can, coverage checkers setting.
Fist we will configure the feedback we want to generate.
There are three types of feedback that should be generated.
The first one is default feedback for failed test methods.
There are several ways to configure this behavior:
If you only want to generate default test feedback for one class you should use
```
"EvenTest:TEST" 
```
or if you want to generate feedback for all test classes you can use
```
":TEST
```
In this case both ways a possible.
Now we can setup the our custom Feedback von uncovered statements.
If the student only tests the funktion with a even number we will generate following feedback
```
You only tested the method with an even value
```
and in the case of a uneven value the feedback 
```
You only tested the method with an uneven value
```
To configure this feedback we have provide folloeing information:
- The classname
- The Index
- The Feedbacktype

The tool should look like the following image:

![feedback](images/cov_feedback.png)

The next step is to add the location of your additional resources like a zip-folder.
In this folder you should add the class Even.java.
This information can be store in the property named 

```
ADDITIONAL RESOURCE
```
The following image shows an example with invented values.

![add](images/cov_additional.png)

At last we can copy the json object on the right side and add it to the 
code block on the side of quarterfall.

![add](images/cov_finished.png)
