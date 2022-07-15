# Style Checker Tutorial
This is a quick exemplary tutorial for setting up the Style Checker in **Quarterfall**.

## <a name="general-information"></a>General Information
Style Checker checks the code for code style violations with pre-defined rules in MASS.
Although some rules can be from the user customized. Every rule has a default value, so you can pick just the editable rules that you want to edit.

## <a name="used-example"></a>Used Example
As an example, we will be using a project containing Class Bag:
### <a name="class-bag.java"></a>Class `Bag.java`

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
## <a name="create-the-design-settings-file"></a>Create The Style Checker config
In this tutorial, we configure a small selection of settings that will be used to run the checker

### <a name="settings-we-want-to-use"></a>Settings We Want To Use

In this example, to keep things simple, we want to check the class Bag for tow different coding style metrics:
- Length of each method should be smaller than 10 lines.
- Each class should maximal have three fields

### <a name="build-the-json-file"></a>Config as JSON
Use the following JSON to config the style checker
```json
{
  "style": {
    "methodLength": 10,
    "fieldsCount": 3
  }
}
```

The setting should be added to the `qf.mass` object and be named `"style"`. By doing so, the mass checker knows that the style checker has to be used when submitting solution later.

After the settings are defined, students have to upload the answer in Quarterfall and wait for a feedback.
The feedback should look similar to this:
