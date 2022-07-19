# Test Coverage Checker Tutorial

In this tutorial you will learn how to configure the Coverage Checker.
There for we will configure feedback for following assignment.

## Table of Contents
1. [General Information](#coverage-general-information)
2. [Used Example](#coverage-used-example)
3. [Configuration](#coverage-configuration)
	1. [Manual Configuration](#coverage-manually)
	2. [From Website](#coverage-from-website)
	3. [Configuration Walkthrough](#coverage-configuration-walkthrough)

## <a id="coverage-general-information"></a>General Information
The Test Coverage Checker is a part of the MASS Checker.
It generates feedback regarding to the completeness of tests written by a learner.

## <a id="coverage-used-example"></a>Used Example
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


## <a id="coverage-config"></a>Configuration:
The first step is to add following link in to the **Cloud Check**:
```
https://github.com/qped-eu/MASS-checker.git
```

After this step we can start to configure the coverage checker.
The checker uses JSON format for this purpose.
There are two ways to generate this files.

### <a id="coverage-manually"></a>Manual Configuration
You can simply open up Quarterfall and manually enter the configuration into the field below.

![Quarterfall conf.](images/cov_cloud-check-conf.png)

### <a id="coverage-from-website"></a>From Website
Luckily, you can use our tool on this homepage to generate your configuration.

[HOMEPAGE ](https://qped-eu.github.io/mass/index.html?tab=config)

You should see a page looking similar to this screenshot.

![TOOL_INDEX.](images/cov_homepage.png)

The above link sends you directly to our configurator where you can configure every single checker in any way you'd like.
For this checker, you need to check the ***Enable Test Coverage Checker*** checkbox.
Now, you should be able to see that ***Test Coverage Checker*** appears in the blue bar above.
If you click on that, it will let you configure this checker.

### <a id="coverage-configuration-walkthrough"></a>Configuration Walkthrough

You should now see the following properties:

- **conSetting**
    - **feedback**
    - **additional**


In the next step we will be covering Test Coverage Checker's setting.
Firstly, we will configure the feedback we want to generate.
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
In this case both ways are possible.
Now we can setup our custom Feedback of uncovered statements.
If the student only tests the function with an even number we will generate following feedback:
```
You only tested the method with an even value
```
However, in the case of an uneven value the feedback will look like this:
```
You only tested the method with an uneven value
```
To configure this feedback we need to provide the following information:
- The classname
- The index
- The feedbacktype

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

Finally, we can copy the JSON object on the right side and add it to the code block on the side of quarterfall.

![add](images/cov_finished.png)
