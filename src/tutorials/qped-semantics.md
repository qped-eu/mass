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
