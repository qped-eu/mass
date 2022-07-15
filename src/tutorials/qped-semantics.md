# Semantic checker Tutorial
This is a quick exemplary tutorial for setting up the Semantic checker in **Quarterfall**.

## <a name="general-information"></a>General Information

The settings should be added to the qf.mass object and named semantic.
You can find and build the JSON settings with the JSON schema website.
In this tutorial, we will be handling an example with specific settings for this particular example.

Our Example is a project with two classes.
### <a name="class-bag.java"></a>Class `Bag.java`

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
### <a name="class-mapper.java"></a>Class `Mapper.java`
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

The Setting we are using are intended to pervent the student from using while loops in the first class
``Bag.java`` and from using recurive in the second class ``Mapper.java``
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
After define the Settings click the student have to upload the answer in quarterfall and waith for a feedback.
The feedback should look like this for the student:

![semantic Feedback ](images/semantic_Feedback.png)
