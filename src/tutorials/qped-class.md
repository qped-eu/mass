# Class Checker Tutorial
This tutorial concerns itself with the use of the **class checker**, specifically how to set it up and use.

## Table of Contents
1. [General Information](#class-general-information)
2. [Used Example](#class-used-example)
	1. [Example Json Input](#class-class-bag.java)
	2. [Json Input Explanation](#class-class-bag.java)
3. [General Keyword Structure](#class-keyword-structure)
	1. [Json Input Walkthrough](#class-input-json-walkthrough)
		1. [Employee](#class-employee)
		2. [classKeywords](#class-class-keywords-walkthrough)
		3. [inheritsFrom](#class-inherits-from-walkthrough)
		4. [fieldKeywords](#class-field-keywords-walkthrough)
		5. [methodKeywords](#class-method-keywords-walkthrough)
	2. [Programmer](#class-programmer)
		1. [classKeywords](#class-class-keywords-programmer)
		2. [inheritsFrom](#class-class-inherits-from-programmer)
		3. [fieldKeywords](#class-class-field-keywords-programmer)
		4. [methodKeywords](#class-class-method-keywords-programmer)
4. [Example Student Submission](#class-example-student-submission)
	1. [Interface Employee](#class-interface-employee)
	2. [Class Programmer](#class-programmer-class)
5. [Generated Feedback](#class-generated-feedback)
	1. [Feedback for Employee](#class-employee-feedback)
	2. [Feedback for Programmer](#class-programmer-feedback)
		

## <a id="class-general-information"></a>General Information
The class checker has the ability to check for class properties, such as present class members and inherited classes.
Furthermore it can check for the keywords that should be present in class elements, such as access and non access modifiers. 
We will be using an example task to illustrate different features of the checker.
Furthermore, we will demonstrate what an example set up looks like and what the checker is going to look for in the provided student solution.
Based on the information given and the student solution, possible mismatches are marked and generated feedback for.
## <a id="class-used-example"></a>Used Example
Create an ``interface Employee`` and a ``class Programmer``.
The ``interface Employee`` possesses the following two methods:

- ``void sleeping()``
- ``void working()``

Employee also possesses the method ``default void getSalary()``, which outputs the salary of the employee.
For simplicity lets assume that every employee has a salary of 50000.

The ``class Programmer`` implements the ``interface Employee`` and has a ``private String`` field, which holds the status of the employee.
The field is set with the implemented methods ``void sleeping()`` and ``void working()``, either with the status **sleeping** or **working**.
Programmer also possesses a method ``public String getStatus()``, which outputs the current status of the programmer.

### <a id="class-example-input-json"></a>Example .json Input
```json
{
	[
		{
			"classKeywords": "interface Employee",
			"inheritsFrom": [],
			"fieldKeywords": [],
			"methodKeywords": [
				"void working",
				"void sleeping",
				"default void getSalary"
			]
		},
		{
			"classKeywords": "public class Programmer",
			"inheritsFrom": ["interface Employee"],
			"fieldKeywords": [
				"private String *"
			],
			"methodKeywords": [
				"void working",
				"void sleeping",
				"public String getStatus"
			]
		}
	]
}
```

### <a id="class-input-json-explanation"></a>.json Input Explanation
The input allows us to specify, what we can expect from the solution.
In particular, the input .json file is used to check against the student solution and generate feedback based on discrepancies.
For each class we define an object, that holds all expected information that the class should contain, including the class declaration itself.
Here we defined two objects for ``interface Employee`` and ``class Programmer``.
In general, the only field required to be filled is *classKeywords*, such that it can be matched up with the students solution in the checker.
The default value for *classKeywords* is ``class TestClass``.

## <a id="class-keyword-structure"></a>General keyword structure
The general structure of the keywords for  *classKeywords*, *fieldKeywords*, *inheritsFrom* and *methodKeywords* is as follows: 
{access modifier} {non access modifiers} {type} {name} 

If you wish to allow any keyword in place of a concrete keyword in *fieldKeywords* or *methodKeywords*, you can replace the keyword placeholder with  a \* (asterisk).
Note that it is important to use **valid** keywords for expected declarations, as the input file is not checked for its ability to compile and  and is treated as the **model solution**.
If there are any mismatches between this solution and the student solution, the input solution is treated as the correct one and the checker generates feedback based on that.

### <a id="class-input-json-walkthrough"></a>.json Input Walkthrough

#### <a id="class-employee"></a>Employee
This section concerns itself with what we can expect from the student solution for ``interface Employee``.

#### <a id="class-class-keywords-walkthrough"></a>classKeywords
For *Employee* we expect the class declaration to be "interface Employee", indicated by *classKeywords*.
This means that we expect the access and non access modifier to be empty,
the type to be an *interface* and the name of the interface to be *Employee*.

#### <a id="class-inherits-from-walkthrough"></a>inheritsFrom
We do not expect *Employee* to be inheriting other classes, so that *inheritsFrom* is empty.

#### <a id="class-field-keywords-walkthrough"></a>fieldKeywords
Similarly, we do not expect there to be fields present in the interface, such that the array *fieldKeywords* is empty.

#### <a id="class-method-keywords-walkthrough"></a>methodKeywords
For the methods, we expect the interface to possess three different methods, indicated by the array *methodKeywords*.
Note that each method declaration here does not possess parentheses, as these are not compared against and can be omitted.

----

### <a id="class-programmer"></a>Programmer
This section is for the object created for the ``class Programmer``.
#### <a id="class-class-keywords-programmer"></a>classKeywords
We expect ``public class Programmer`` to be the class declaration found in the student solution.
This means that the *access modifier* is ``public``,  the *type* is ``class`` and the *name* of the class is ``Programmer``.
We do not expect any *non access modifier* to be part of the class declaration.
#### <a id="class-inherits-from-programmer"></a>inheritsFrom
For the super classes we expect the ``interface Employee`` to be inherited, such that we indicate it as such in *inheritsFrom*.

#### <a id="class-field-keywords-programmer"></a>fieldKeywords
For the fields we expect there to be a field with the keywords ``private String *``, indicated by *fieldKeywords*.
In the task we did not expect a particular name for the field. We can indicate **any** keyword instead of a particular keyword  in that place by placing a \* (asterisk).
So if we want to allow any name, we can place an asterisk in the place of the *name*.
This works for **all keyword placeholders** in *fieldKeywords* and *methodKeywords*, giving you freedom in choosing which keywords you wish to specify  and which ones you wish to allow any for.
#### <a id="class-method-keywords-programmer"></a>methodKeywords
As we expect the methods from *Employee* to be implemented here, we also specify them in the *methodKeywords* again, to indicate that we expect them inside of this class.
Note that we did not specify the method ``default void getSalary`` here, as it has already been implemented and does not need to be implemented again in subclasses.

## <a id="class-example-student-submission"></a>Example Student Submission
The following code could be a possible student submission, that is now going to be checked by the tool against the expected keywords provided in the input.

### <a id="class-interface-employee"></a>Interface Employee
```java
interface Employee {
	void working();
	void sleeping();
	public default int getSalary() {
		return 50000;
	}
}
```
### <a id="class-programmer-class"></a>Class Programmer
```java
public class Programmer implements Employee {
	public String status = "";
	public void working() {
		status = "working";
	}
	public void sleeping() {
		status = "sleeping";
	}
	public String getStatus() {
		return status;
	}
}
```
## <a id="class-generated-feedback"></a>Generated Feedback

### <a id="class-employee-feedback"></a>Feedback for Employee
As the ``interface Employee`` matches up with the expected values provided in the .json file, the checker does not generate any feedback for it.

### <a id="class-programmer-feedback"></a>Feedback for Programmer
``class Programmer`` does not match up exactly with the expected values provided in the .json file and thus the checker generates feedback for this class.
As we can see for the field ``status`` inside of ``Programmer``, the expected access modifier, set in *fieldKeywords*, is``private``, but here we see that the student set the access modifier for the field to ``public``, indicating a mistake.
We can also see that the student had the freedom to choose the *name* of the field, which the checker does not generate any feedback for. 

The checker now generates the following feedback for the field ``status``:
"AccessModifierError: Different access modifier for **status** in **class Programmer** expected. 
Is the access modifier (e.g. public, private, protected, ...) of **status** set according to the task description?"