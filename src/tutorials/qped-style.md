# Style Checker Tutorial
This is a quick exemplary tutorial for setting up the Style Checker in **Quarterfall**.

## Table of Contents
1. [General Information](#style-general-information)
2. [Used Example](#style-used-example)
   1. [Class Bag.java](#style-class-bag.java)
3. [Create The Design Settings File](#style-create-the-design-settings-file)
   1. [Settings We Want To Use](#style-settings-we-want-to-use)
   2. [Build The JSON File](#style-build-the-json-file)

## <a id="style-general-information"></a>General Information
Style Checker checks the code for code style violations with pre-defined rules in MASS.
Although some rules can be customized by the user.
Every rule has a default value, so you can pick the rules that you want to edit.

## <a id="style-used-example"></a>Used Example
As an example, we will be using a project containing Class Bag:
### <a id="style-class-bag.java"></a>Class `Bag.java`

```java
package ..  
  
public class Bag {  
    private String price;
    public void calcPrice(int loop){  
        while (loop > 5){  
            if (loop > 2){  
                System.out.println(loop);  
				loop--;  
			}  else if (loop > 3){  
                System.out.println(loop);  
			    loop--; 
            }  else {  
                loop--;  
			 }  
        }  
    }
}
```
## <a id="style-create-the-design-settings-file"></a>Create The Style Checker config
In this tutorial, we will configure a small selection of settings that will be used to run the checker.

### <a id="style-settings-we-want-to-use"></a>Settings We Want To Use

In this example, to keep things simple, we want to check the class Bag for two different coding style metrics:
- Length of each method should be smaller than 10 lines.
- Each class should have three fields at most

### <a id="style-build-the-json-file"></a>Config as JSON
Use the following JSON to config the style checker
```json
{
  "style": {
    "methodLength": 10,
    "fieldsCount": 3
  }
}
```

The setting should be added to the `qf.mass` object and be named `"style"`.
By doing so, the mass checker knows that the style checker has to be used when submitting solution later.

After the settings are defined, students have to upload the answer in Quarterfall and wait for a feedback.
The feedback should look similar to this:
