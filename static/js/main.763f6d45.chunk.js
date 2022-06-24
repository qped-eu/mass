(this["webpackJsonpqped-github-pages"]=this["webpackJsonpqped-github-pages"]||[]).push([[0],{539:function(e){e.exports=JSON.parse('{"$id":"http://alucard2112.github.io/qped.github.io/schemas/mass.schema.json","$schema":"http://json-schema.org/draft-07/schema","description":"Enter the description configuration of the Marburg university Auto Assess System (MASS), part of the QPED project.","documentation":"The [Marburg university Auto Assess System (MASS)](http://qped.github.io) is part of the project [Quality-focussed Programming Education (QPED)](https://qped.eu), co-funded by the [Erasmus+-Program of the European Union](https://erasmus-plus.ec.europa.eu) (2020-1-NL01-KA203-064626).\\n\\nMASS performs checks on student solutions to programming assignents in the Java language, with respect to different aspects: syntax, style, solution approach, testing and design. Only the syntax check is mandatory, all other checks are optional. In this configuration, lectures can specify which checks that want to be performed on student solutions and configure these checks according to the requirements of their assignment.","type":"object","title":"QPED-MASS Configuration","additionalProperties":false,"properties":{"syntax":{"title":"Syntax Check Configuration","description":"Configure the properties of a Syntax Check.","documentation":"This is a long documentation of Syntax Check properties.","type":"object","additionalProperties":false,"properties":{"level":{"type":"string","enum":["BEGINNER","INTERMEDIATE","ADVANCED"],"title":"Student Level","description":"Select the level of programming experience for the target student audience."}},"required":["level"]},"styleSettings":{"type":"object","title":"Style Configuration","description":"The Configuration for Style Checker","properties":{"compLevel":{"type":"string","title":"Complexity Level","description":"Complexity Level","documentation":"**A Level for number of methods, fields, imports, method params and classes**","enum":["BEGINNER","INTERMEDIATE","ADVANCED"],"default":"BEGINNER"},"namesLevel":{"type":"string","title":"Naming Conventions Level","description":"Naming Conventions Level","documentation":"**A Level for naming conventions of methods, fields, local variables and classes. This level check also if comments for methods, Classes, and fields are required.**","enum":["BEGINNER","INTERMEDIATE","ADVANCED"],"default":"BEGINNER"},"basisLevel":{"type":"string","title":"Basic Level","description":"General level","documentation":"**controls the rules that checks the general style violation which are not naming conventions, performence or security violations.**","enum":["BEGINNER","INTERMEDIATE","ADVANCED"],"default":"BEGINNER"},"classLength":{"type":"integer","title":"Class Length","description":"The maximal Line number of a Class","documentation":"**The maximal Line number of a Class**","default":-1},"methodLength":{"type":"integer","title":"Method Length","description":"The maximal Line number of each Methods","documentation":"**The maximal Line number of each Methods**","default":-1},"cycloComplexity":{"type":"integer","title":"Method Length","description":"The maximal number of nested Statments (Complexity of the control flow)","documentation":"**The maximal number of nested Statments (Complexity of the control flow)**","default":-1},"fieldsCount":{"type":"integer","title":"Number of Class Fields ","description":"The maximal number of the Class fields","documentation":"**The maximal number of the Class fields**","default":-1},"varName":{"type":"string","title":"Variable Naming Conventions","description":"Regular expression for local Variable Naming Conventions","documentation":"**Regular expression for local Variable Naming Conventions**","default":"[a-z][a-zA-Z0-9]*"},"methodName":{"type":"string","title":"Method Naming Conventions","description":"Regular expression for Method Naming Conventions","documentation":"**Regular expression for Method Naming Conventions**","default":"[a-z][a-zA-Z0-9]*"},"className":{"type":"string","title":"Class Naming Conventions","description":"Regular expression for Class Naming Conventions","documentation":"**Regular expression for Class Naming Conventions**","default":"[A-Z][a-zA-Z0-9_]*"}}},"semanticSettings":{"type":"array","items":{"type":"object","properties":{"filePath":{"type":"string","title":"path for target file","description":"must be fully qualified file path: src.package.another-package.class.java","documentation":"**The filw of the path to be checked using this configurations**"},"methodName":{"type":"string","title":"Name of Method","description":"The name of the method to be checked using this configurations","documentation":"**The name of the method to be checked using this configurations**"},"recursionAllowed":{"type":"boolean","title":"Is Recursive Method","description":"if the method allows recursion","documentation":"**if the method allows recursion**","default":false},"whileLoop":{"type":"integer","title":"Max Number of While Loops","description":"the maximum Number of while loops in the method","documentation":"**the maximum Number of while loops in the method**","default":-1},"forLoop":{"type":"integer","title":"Max Number of For Loops","description":"the maximum Number of for loops in the method","documentation":"**the maximum Number of for loops in the method**","default":-1},"forEachLoop":{"type":"integer","title":"Max Number of ForEach Loops ","description":"the maximum Number of forEach loops in the method","documentation":"**the maximum Number of forEach loops in the method**","default":-1},"ifElseStmt":{"type":"integer","title":"Max Number of If-else Statments ","description":"the maximum Number of If-Else Statment in the method","documentation":"**the maximum Number of If-Else Statment in the method**","default":-1},"doWhileLoop":{"type":"integer","title":"Max Number of Do-While Loop ","description":"the maximum Number of Do-While loops in the method","documentation":"**the maximum Number of Do-While loops in the method**","default":-1},"returnType":{"type":"string","title":"Return Type of Method","description":"the return type of the method to check","documentation":"**the return type of the method to ckeck**"}},"required":["methodName","returnType","filePath"]},"title":"Semantic Configuration","description":"The Configuration for Semantic Checker"},"testing":{"type":"object","title":"COVERAGE CHECKER CONFIGURATION","properties":{"checkerClass":{"type":"string","enum":["eu.qped.java.checkers.coverage.CoverageChecker"],"title":"USED CHECKER","description":"Defines the used checker tool."},"covSetting":{"type":"object","properties":{"feedback":{"type":"array","items":{"type":"string","pattern":"(^([a-zA-Z0-9]*):(TEST|COVERAGE)$|^([a-zA-Z0-9]+:(TEST|COVERAGE|CUSTOM):([a-zA-Z0-9]+):.*)$)"},"title":"FEEDBACK CONFIGURATION","minItems":1,"description":"Defines the used feedback.","documentation":"Defines what feedback this tool can generate. <br>\\nCustom feedback has always a higher priority then default feedback.<br>   \\n\\nPossible values: \\n\\n| Value                                              | Meaning | \\n|----------------------------------------------------|--- |  \\n| :TEST                                              | Generates Default Test Feedback for all test classes |\\n| :COVERAGE                                          | Generates Default Coverage Feedback for all classes|\\n| < class name >:TEST                                | Generates default Feedback for a test class|\\n| < class name >:COVERAGE                            | Generates default Feedback for a class|\\n| < class name >:CUSTOM:< indentifier >:< feedback > | Generates your costom Feedback for a given class and identifier (Index or Method Name)|\\n\\n<br>\\nExample: <br>\\nGenerate feedback for:\\n\\n- all test in class ExampleTest1\\n- one test in class ExampleTest2\\n- one statement in class Example\\n\\n```\\nfeedback : {\\n        \\"ExampleTest1:Test\\",\\n        \\"ExampleTest2:Test:myTest:\\",\\n        \\"Example:CUSTOM:11:Hello World\\"\\n}\\n```"},"format":{"type":"string","enum":["JAVA","MAVEN"],"title":"PROGRAM FORMAT","description":"Defines what a class name and a test class is.","documentation":"Defines what a class name and a test class is. \\n\\n| Format | Meaning                                                                                                             |\\n|--------|---------------------------------------------------------------------------------------------------------------------| \\n| JAVA   | Test classes end with test. <br>Full class name is the total folder path.                                           |\\n| MAVEN  | Test Classes are in the folder path test/java.<br>Full class name is the folder path after test/java ore main/java. |\\n"},"excludeByTypeSet":{"type":"array","items":{"type":"string","enum":["SET","GET","PRIVATE","PROTECTED"]},"title":"EXCLUDE BY TYPE","uniqueItems":true,"description":"Excludes a method by a type.","documentation":"Excludes a method by a type."},"excludeByNameSet":{"type":"array","items":{"type":"string"},"title":"EXCLUDE BY NAME","uniqueItems":true,"description":"Excludes a class or methode by it\'s name.","documentation":"Excludes a class or methode by it\'s name."}},"required":["format","feedback"]},"additional":{"type":"object","properties":{"id":{"type":"string","title":"FILE NAME"},"extension":{"type":"string","enum":[".zip"],"title":"FILE TYPE"},"mimetype":{"type":"string","enum":["application/zip"],"title":"TYPE"},"path":{"type":"string","title":"PATH"},"url":{"type":"string","title":"URL"}},"title":"ADDITIONAL RESOURCE","description":"","documentation":"Defines the location of a additional resource like a zip file.","required":["id","extension","mimetype","url"]}},"required":["covSetting","checkerClass"]},"class":{"type":"array","description":"Information for all classes","title":"Class Info Collection","items":{"type":"object","title":"Expected Class Infos","description":"Contains all information for present classes.","documentation":"This holds all information about all possible classes inside the given files. Note that not only outer but also inner classes should have infos created here, if you wish to check them for properties.","required":["classKeywords"],"properties":{"classKeywords":{"title":"Expected Class Keywords","type":"string","description":"Modifiers, type and name of the current class.","default":"class TestClass","documentation":"All expected keywords of the current class declaration. This only concerns the current class and follows the same pattern as the Java class declaration. Format: [access modifier] [non access modifier] [class/interface] [name].\\n\\n### Examples: - public abstract class Number - interface Employee","pattern":"\\\\s*(\\\\w*)\\\\s+(\\\\w+)"},"inheritsFrom":{"title":"Expected Superclass Collection","type":"array","description":"Contains all expected superclasses.","documentation":"All expected super classes of the current class declaration.  Format:[class/interface] [name]. ### Examples: - interface Employee - abstract class Number","items":{"type":"string","title":"Expected Superclass","description":"Type and name of an inherited super class.","pattern":"\\\\s*(\\\\w*)\\\\s+(\\\\w+)"}},"fieldKeywords":{"type":"array","description":"Contains all expected keywords for present fields.","title":"Field Keywords Collection","documentation":"All expected keywords of the variable declarations. All keyword inputs should have the same format as the Java variable declarations. Format: [access modifier] [non access modifier] [type] [name] Note that anything after the name, such as initialisations, will not be considered and can be omitted. Additionally, if one wishes to allow any keyword for a particular keyword type, one can replace the keyword with a *(asterisk) to indicate that any value is allowed there. ### Examples: - private String name - private int * (indicating that the name can be any)","items":{"title":"Field Keywords","type":"string","description":"Modifiers, type and name of a field declaration.","pattern":"\\\\s*(\\\\w*)\\\\s+(\\\\w+)(;|=)?"}},"methodKeywords":{"type":"array","title":"Method Keywords Collection","description":"Contains all expected keywords for all present methods.","documentation":"All expected keywords of the method declarations. The input here follows the same format as the Java method declarations. Format: [access modifier] [non access modifier] [return type] [name]. Anything after the name, such as further parameters, will not be considered and can be omitted. Additionally, if one wishes to allow any keyword, one can replace the keyword with a *(asterisk) to indicate that any value is allowed there. ### Examples: - protected String getName - *(asterisk) String getStatus (indicating that the access modifier can be any)","items":{"title":"Method Keywords","type":"string","description":"Modifiers, type and name of a method declaration.","pattern":"\\\\s*(\\\\w*)\\\\s+(\\\\w+)\\\\(?\\\\)?"}}}}},"design":{"title":"Design Checker","description":"Checker for class design metrics","type":"object","properties":{"amcThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Average Method Complexity\\\\nThis metric measures the average method size for each class. Size of a method is equal to the number of java binary codes in the method."}},"title":"AMC","description":"Average Method Complexity","required":["min","max","documentation"]},"caThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Afferent Coupling\\\\nA class\'s afferent couplings is a measure of how many other classes use the specific class. Coupling has the same definition in context of Ca as that used for calculating CBO. "}},"title":"CA","description":"####Afferent Coupling\\\\nA class\'s afferent couplings is a measure of how many other classes use the specific class. Coupling has the same definition in context of Ca as that used for calculating CBO. ","required":["min","max","documentation"]},"camThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Cohesion Among Methods of Class\\\\nThis metric computes the relatedness among methods of a class based upon the parameter list of the methods. The metric is computed using the summation of number of different types of method parameters in every method divided by a multiplication of number of different method parameter types in whole class and number of methods. A metric value close to 1.0 is preferred. (Range 0 to 1).\\n"}},"title":"CAM","description":"Cohesion Among Methods of Class","required":["min","max","documentation"]},"cbmThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Coupling Between Methods\\\\nThe metric measure the total number of new/redefined methods to which all the inherited methods are coupled. There is a coupling when one of the given in the IC metric definition conditions holds."}},"title":"CBM","description":"Coupling Between Methods","required":["min","max","documentation"]},"cboThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Coupling between object classes\\\\nThe coupling between object classes (CBO) metric represents the number of classes coupled to a given class (efferent couplings and afferent couplings). This coupling can occur through method calls, field accesses, inheritance, arguments, return types, and exceptions."}},"title":"CBO","description":"Coupling Between Object Classes","required":["min","max","documentation"]},"ccThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####The McCabe\'s cyclomatic complexity\\\\nIt is equal to number of different paths in a method (function) plus one. The cyclomatic complexity is defined as:\\\\nCC = E - N + P\\\\nwhere\\\\nE - the number of edges of the graph\\\\nN - the number of nodes of the graph\\\\nP - the number of connected components "}},"title":"CC","description":"McCabe\'s Cyclomatic Complexity","required":["min","max","documentation"]},"ceThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Efferent coupling\\\\nA class\'s efferent couplings is a measure of how many other classes is used by the specific class. Coupling has the same definition in context of Ce as that used for calculating CBO.\\n"}},"title":"CE","description":"Efferent Coupling","required":["min","max","documentation"]},"damThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Data Access Metric\\\\nThis metric is the ratio of the number of private (protected) attributes to the total number of attributes declared in the class. A high value for DAM is desired. (Range 0 to 1)"}},"title":"DAM","description":"Data Access Metric","required":["min","max","documentation"]},"ditThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Depth of Inheritance Tree\\\\nThe depth of inheritance tree (DIT) metric provides for each class a measure of the inheritance levels from the object hierarchy top. In Java where all classes inherit Object the minimum value of DIT is 1."}},"title":"DIT","description":"Depth Of Inheritance Tree","required":["min","max","documentation"]},"icThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Inheritance Coupling\\\\nThis metric provides the number of parent classes to which a given class is coupled. A class is coupled to its parent class if one of its inherited methods functionally dependent on the new or redefined methods in the class. A class is coupled to its parent class if one of the following conditions is satisfied:\\\\n-One of its inherited methods uses a variable (or data member) that is defined in a new/redefined method.\\\\nOne of its inherited methods calls a redefined method.\\\\n-One of its inherited methods is called by a redefined method and uses a parameter that is defined in the redefined method.\\n"}},"title":"IC","description":"Inheritance Coupling","required":["min","max","documentation"]},"lcomThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Lack of cohesion in methods\\\\nA class\'s lack of cohesion in methods (LCOM) metric counts the sets of methods in a class that are not related through the sharing of some of the class\'s fields. The original definition of this metric (which is the one used in ckjm) considers all pairs of a class\'s methods. In some of these pairs both methods access at least one common field of the class, while in other pairs the two methods to not share any common field accesses. The lack of cohesion in methods is then calculated by subtracting from the number of method pairs that don\'t share a field access the number of method pairs that do. Note that subsequent definitions of this metric used as a measurement basis the number of disjoint graph components of the class\'s methods. Others modified the definition of connectedness to include calls between the methods of the class (original definition (1994) definition by Chidamber and Kemerer)."}},"title":"LCOM","description":"Lack Of Cohesion In Methods","required":["min","max","documentation"]},"lcom3Threshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Lack of cohesion in methods.\\\\nLCOM3 varies between 0 and 2.\\\\nm - number of procedures (methods) in class\\\\na - number of variables (attributes in class)\\\\n\xb5(A) - number of methods that access a variable (attribute)\\\\nThe constructors and static initializations are taking into accounts as separately methods."}},"title":"LCOM3","description":"Lack Of Cohesion In Methods Henderson-Sellers version","required":["min","max","documentation"]},"locThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Lines of Code.\\\\nThe lines are counted from java binary code and it is the sum of number of fields, number of methods and number of instructions in every method of given class.\\n"}},"title":"LOC","description":"Lines Of Code","required":["min","max","documentation"]},"mfaThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Measure of Functional Abstraction\\\\nThis metric is the ratio of the number of methods inherited by a class to the total number of methods accessible by member methods of the class. The constructors and the java.lang.Object (as parent) are ignored. (Range 0 to 1)\\n"}},"title":"MFA","description":"Measure of Functional Abstraction","required":["min","max","documentation"]},"moaThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Measure of Aggregation\\\\nThis metric measures the extent of the part-whole relationship, realized by using attributes. The metric is a count of the number of data declarations (class fields) whose types are user defined classes.\\n"}},"title":"MOA","description":"Measure of Aggregation","required":["min","max","documentation"]},"nocThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Number of Children\\\\nA class\'s number of children (NOC) metric simply measures the number of immediate descendants of the class.\\n"}},"title":"NOC","description":"Number Of Children","required":["min","max","documentation"]},"npmThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Number of Public Methods\\\\nThe NPM metric simply counts all the methods in a class that are declared as public. It can be used to measure the size of an API provided by a package.\\n"}},"title":"NPM","description":"Number of Public Methods for a class","required":["min","max","documentation"]},"rfcThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Response for a Class\\\\nThe metric called the response for a class (RFC) measures the number of different methods that can be executed when an object of that class receives a message (when a method is invoked for that object). Ideally, we would want to find for each method of the class, the methods that class will call, and repeat this for each called method, calculating what is called the transitive closure of the method\'s call graph. This process can however be both expensive and quite inaccurate. Here, a rough approximation to the response set is calculated by simply inspecting method calls within the class\'s method bodies. The value of RFC is the sum of number of methods called within the class\'s method bodies and the number of class\'s methods. This simplification was also used in the 1994 Chidamber and Kemerer description of the metrics.\\n"}},"title":"RFC","description":"Response For A Class","required":["min","max","documentation"]},"wmcThreshold":{"type":"object","properties":{"metricname":{"type":"string","description":"The threshold\'s corresponding metric.","title":"Metric\'s name"},"min":{"type":"number","description":"The metric\'s lower bound","minimum":0,"title":"lower bound"},"max":{"type":"number","description":"The metric\'s upper bound.","minimum":0,"title":"upper bound"},"documentation":{"type":"string","description":"####Weighted methods per class\\\\nA class\'s weighted methods per class WMC metric is simply the sum of the complexities of its methods. As a measure of complexity we can use the cyclomatic complexity, or we can abritrarily assign a complexity value of 1 to each method. The ckjm program assigns a complexity value of 1 to each method, and therefore the value of the WMC is equal to the number of methods in the class."}},"title":"WMC","description":"Weighted methods per class","required":["min","max","documentation"]},"classTypeName":{"type":"object","properties":{"documentation":{"type":"string","description":"####Class Type Name\\\\nWith this setting, it can be defined, what name a class should have, e.g. \\"class:TestClassName\\"."}}},"inheritsFrom":{"type":"object","properties":{"keywords":{"type":"array","items":{"type":"string"}},"documentation":{"type":"string","description":"####Inherits From\\\\nWith this setting, it can be defined, from which classes or interfaces a given class must inherit. e.g. [\\"interface:Comparable\\", \\"class:ExampleAbstractClass\\"],"}}},"fieldKeywords":{"type":"object","properties":{"keywords":{"type":"array","items":{"type":"string"}},"documentation":{"type":"string","description":"####Field Keywords\\\\Determines the classes field keywords that must be used, e.g.: \\"fieldKeywords:[\\"private String name\\", \\"private String year\\"]."}}},"methodKeywords":{"type":"object","properties":{"keywords":{"type":"array","items":{"type":"string"}},"documentation":{"type":"string","description":"####Method Keywords\\\\Determines the classes method keywords that must be used, e.g.: \\"methodKeywords:[\\"public int compareTo\\", \\"protected boolean remove\\"]."}}}},"required":[]}},"required":["syntax"]}')},540:function(e){e.exports=JSON.parse('{"type":"VerticalLayout","elements":[{"type":"Control","label":"Completed","scope":"#/properties/done"},{"type":"Control","scope":"#/properties/name"},{"type":"HorizontalLayout","elements":[{"type":"Control","scope":"#/properties/due_date"},{"type":"Control","scope":"#/properties/rating"}]},{"type":"HorizontalLayout","elements":[{"type":"Control","scope":"#/properties/recurrence"},{"type":"Control","scope":"#/properties/recurrence_interval","rule":{"effect":"HIDE","condition":{"type":"LEAF","scope":"#/properties/recurrence","expectedValue":"Never"}}}]},{"type":"Control","scope":"#/properties/description","options":{"multi":true}}]}')},815:function(e,t,i){},870:function(e,t,i){"use strict";i.r(t);var n=i(80),o=i(931),s=i(354),r=i(83),a=i.n(r),c=i(11),m=i(16),d=i(0),l=i(22),p=i(536),h=i(493),u=i(279),f=i.p+"static/media/logo.103b5fa1.svg",b=(i(815),i(539)),y=i(540),g=i(351),T=i(500),C=i(2),x=function(e){var t=e.id,i=e.value,n=e.updateValue,o=Object(d.useState)(null),s=Object(c.a)(o,2),r=s[0],a=s[1];return Object(C.jsxs)("div",{id:"#/properties/rating",className:"rating",children:[Object(C.jsx)(T.a,{shrink:!0,style:{marginTop:"0.8em"},children:"Rating"}),Object(C.jsx)("div",{style:{cursor:"pointer",fontSize:"18px"},children:[0,1,2,3,4].map((function(e){var o=null!==r&&void 0!==r?r:i;return Object(C.jsx)("span",{onMouseOver:function(){return a(e+1)},onMouseOut:function(){return a(null)},onClick:function(){return n(e+1)},children:e<o?"\u2605":"\u2606"},"".concat(t,"_").concat(e))}))})]})},w=Object(l.withJsonFormsControlProps)((function(e){var t=e.data,i=e.handleChange,n=e.path;return Object(C.jsx)(x,{value:t,updateValue:function(e){return i(n,e)}})})),v=i(18),j=Object(v.rankWith)(3,Object(v.scopeEndsWith)("rating")),E=i(930),N=Object(E.a)({container:{padding:"1em",width:"100%"},title:{textAlign:"center",padding:"0.25em"},dataContent:{display:"flex",justifyContent:"center",borderRadius:"0.25em",backgroundColor:"#cecece",marginBottom:"1rem"},resetButton:{margin:"auto !important",marginBottom:"10px",display:"block !important"},demoform:{margin:"auto",padding:"1rem"}}),A={name:"Send email to Adrian",description:"Confirm if you have passed the subject\nHereby ...",done:!0,recurrence:"Daily",rating:3},M=[].concat(Object(m.a)(g.materialRenderers),[{tester:j,renderer:w}]),O=function(){var e=N(),t=Object(d.useState)(A),i=Object(c.a)(t,2),n=i[0],o=i[1],s=Object(d.useMemo)((function(){return JSON.stringify(n,null,2)}),[n]);return Object(C.jsxs)(d.Fragment,{children:[Object(C.jsx)("div",{className:"App",children:Object(C.jsxs)("header",{className:"App-header",children:[Object(C.jsx)("img",{src:f,className:"App-logo",alt:"logo"}),Object(C.jsx)("h1",{className:"App-title",children:"Welcome to the QPED-project's configurator"}),Object(C.jsx)("p",{className:"App-intro",children:"Easily configure our checkers for Quarterfall."})]})}),Object(C.jsxs)(p.a,{container:!0,justifyContent:"center",spacing:1,className:e.container,children:[Object(C.jsxs)(p.a,{item:!0,sm:6,children:[Object(C.jsx)(u.a,{variant:"h4",className:e.title,children:"Configuration Editor"}),Object(C.jsx)("div",{className:e.demoform,children:Object(C.jsx)(l.JsonForms,{schema:b,uischema:y,data:n,renderers:M,cells:g.materialCells,onChange:function(e){e.errors;var t=e.data;return o(t)}})})]}),Object(C.jsxs)(p.a,{item:!0,sm:6,children:[Object(C.jsx)(u.a,{variant:"h4",className:e.title,children:"Configuration Data"}),Object(C.jsx)("div",{className:e.dataContent,children:Object(C.jsx)("pre",{id:"boundData",children:s})}),Object(C.jsx)(h.a,{className:e.resetButton,onClick:function(){navigator.clipboard.writeText(JSON.stringify(n))},color:"primary",variant:"contained",children:"Copy to clipboard"}),Object(C.jsx)(h.a,{className:e.resetButton,onClick:function(){o({})},color:"primary",variant:"contained",children:"Clear data"})]})]})]})},k=Object(n.b)({components:{MuiFormControl:{styleOverrides:{root:{margin:"0.8em 0"}}}}});a.a.render(Object(C.jsxs)(o.a,{theme:k,children:[Object(C.jsx)(s.b,{}),Object(C.jsx)(O,{})]}),document.getElementById("root"))}},[[870,1,2]]]);
//# sourceMappingURL=main.763f6d45.chunk.js.map