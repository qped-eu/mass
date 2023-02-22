# Integrated Example: Procedural Guidance with Automatic Feedback

This is an electronic appendix to the submission *"Procedural Guidance and Automatic Feedback for Teaching Thorough Testing"* by Steffen Dick, Christoph Bockisch, Harrie Passier, Lex Bijlsma and Ruurd Kuiper to the journal *IEEE Software, Special Issue on Software Engineering Education & Training*

## Interactive Demo Assignment

The students view on the integrated assignment, showcasing the procedural guidance as well as the automatically generated feedback, can be accessed via an [openly accessible assignment on the Quarterfall](https://pro.quarterfall.com/do/j7qg0pcp).

## Configuration for Feedback Toolkit

The configuration for the feedback toolkit including the private implementations are hidden from the students and cannot be accessed via the student's view, linked above. The Quartefall user interface for configuring assignments is only available to registered users. A tutorial with screenshots can, however, be viewed in our [MASS checker tutorial](https://qped-eu.github.io/mass/). The configuration data is, nevertheless, presented below. If you have a Quarterfall account, you can also import this assignment including the full configuration using the Share Code `2BG3MH`.

### Sub Question a)

**MASS configuration**:

```json
qf.mass = {
  "styleSelected": true,
  "semanticSelected": false,
  "coverageSelected": true,
  "classSelected": false,
  "metricsSelected": false,
  "syntax": {
    "level": "BEGINNER"
  },
  "style": {
    "basisLevel": "INTERMEDIATE",
    "complexityLevel": "INTERMEDIATE",
    "namesLevel": "INTERMEDIATE",
    "classLength": -1,
    "methodLength": -1,
    "cyclomaticComplexity": -1,
    "fieldsCount": -1,
    "variableNamePattern": "[a-z][a-zA-Z0-9]*",
    "methodNamePattern": "[a-z][a-zA-Z0-9]*",
    "methodParameterNamePattern": "[a-z][a-zA-Z0-9]*",
    "classNamePattern": "[A-Z][a-zA-Z0-9_]*"
  },
  "coverage": {
    "showTestFailures": true,
    "showFullCoverageReport": false,
    "feedback": [
      {
        "showFor": "FULLY_MISSED",
        "fileName": "collections/Bag.java",
        "lineRanges": "43",
        "message": "You have not created a new bag needed to test the class Bag",
        "ID": "attr_0"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "56",
        "fileName": "collections/Bag.java",
        "message": "Method add: You have not tested the add method at all.",
        "suppresses": "add_1,add_2,add_3",
        "ID": "add_0"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "58",
        "fileName": "collections/Bag.java",
        "message": "Method add: You have not tested the add method with an empty bag.",
        "ID": "add_1"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "60",
        "fileName": "collections/Bag.java",
        "message": "Method add: You have not tested the add method with an non-empty bag.",
        "ID": "add_2"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "63",
        "fileName": "collections/Bag.java",
        "message": "Method add: You have not tested the add method with values that are added more than once.",
        "ID": "add_3"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "85",
        "fileName": "collections/Bag.java",
        "message": "Method remove: You have not tested the remove method at all.",
        "ID": "rem_0",
        "suppresses": "rem_1,rem_2,rem_3"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "87",
        "fileName": "collections/Bag.java",
        "message": "Remove method: You have not tested the requirement `length > 0' and a bag containing elem (happy-path scenario)",
        "ID": "rem_1"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "90",
        "fileName": "collections/Bag.java",
        "message": "Remove method: You have not tested the requirement `length = 0' of the non-happy-path",
        "ID": "rem_2"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "93",
        "fileName": "collections/Bag.java",
        "message": "Remove method: You have not tested the requirement `the bag does not contain element elem' of the non-happy path.",
        "ID": "rem_3"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "106",
        "fileName": "collections/Bag.java",
        "message": "Method length: You have not tested the length method at all.",
        "ID": "len_0",
        "suppresses": "len_1, len_2"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "108",
        "fileName": "collections/Bag.java",
        "message": "Method length: You have not tested the length of an empty bag.",
        "ID": "len_1"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "110",
        "fileName": "collections/Bag.java",
        "message": "Method length: You have not tested the length of a non-empty bag.",
        "ID": "len_2"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "124",
        "fileName": "collections/Bag.java",
        "message": "Method equals: You have not tested the equals method at all.",
        "ID": "eq_0",
        "suppresses": "eq_1,eq_2,eq_3,eq_4,eq_5,eq_6,eq_7,eq_8"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "126",
        "fileName": "collections/Bag.java",
        "message": "Method equals: You have not tested the equals method with null parameter.",
        "ID": "eq_1"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "130",
        "fileName": "collections/Bag.java",
        "message": "Method equals: You have not tested the equals method with a parameter not instance of Bag.",
        "ID": "eq_2"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "134",
        "fileName": "collections/Bag.java",
        "message": "Equals method: You have not tested the equals method with an empty bag as this. ",
        "ID": "eq_3"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "137",
        "fileName": "collections/Bag.java",
        "message": "Equals method: You have not tested the equals method with an empty bag as parameter.",
        "ID": "eq_4"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "140",
        "fileName": "collections/Bag.java",
        "message": "Equals method: You have not tested the equals method with an non-empty bag as this.",
        "ID": "eq_5"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "143",
        "fileName": "collections/Bag.java",
        "message": "Equals method: You have not tested the equals method with an non-empty bag as parameter.",
        "ID": "eq_6"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "146",
        "fileName": "collections/Bag.java",
        "message": "Equals method: You have not tested the equals method with two bags of equal length.",
        "ID": "eq_7"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "149",
        "fileName": "collections/Bag.java",
        "message": "Equals method: You have not tested the equals method with two bags of unequal length.",
        "ID": "eq_8"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "171",
        "fileName": "collections/Bag.java",
        "message": "Method getElements: You have not tested the getElems method at all.",
        "suppresses": "getEl_1,getEl_2",
        "ID": "getEl_0"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "174",
        "fileName": "collections/Bag.java",
        "message": "Method getElements: You have not tested the getElems method with an empty bag.",
        "ID": "getEl_1"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "176",
        "fileName": "collections/Bag.java",
        "message": "Method getElements: You have not tested the getElems method with a non-empty bag.",
        "ID": "getEl_2"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "193",
        "fileName": "collections/Bag.java",
        "message": "Method cardinality: You have not tested the cardinality method at all.",
        "suppresses": "car_1,car_2,car_3,car_4",
        "ID": "car_0"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "195",
        "fileName": "collections/Bag.java",
        "message": "Method cardinality: You have not tested the cardinality using an empty bag.",
        "ID": "car_1"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "199",
        "fileName": "collections/Bag.java",
        "message": "Method cardinality: You have not tested the cardinality of a bag that does not contain the element.",
        "ID": "car_2"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "201",
        "fileName": "collections/Bag.java",
        "message": "Method cardinality: You have not tested the cardinality of a bag that contains the element exactly once.",
        "ID": "car_3"
      },
      {
        "showFor": "FULLY_MISSED",
        "lineRanges": "203",
        "fileName": "collections/Bag.java",
        "message": "Method cardinality: You have not tested the cardinality of a bag that contains the element more than once.",
        "ID": "car_4"
      }
    ]
  },
  "instructorResources": "qf:collections.zip"
}
```

**Private implementation**: [collections.zip](https://qped-eu.github.io/mass/files/collections.zip)

### Sub Question b)

**MASS configuration**:

```json
qf.mass = {
  "styleSelected": true,
  "instructorResources": "qf:test.zip",
  "semanticSelected": false,
  "coverageSelected": true,
  "classSelected": false,
  "metricsSelected": false,
  "syntax": {
    "level": "BEGINNER"
  },
  "coverage": {
    "feedback": [],
    "showTestFailures": true,
    "showFullCoverageReport": false    
  },
  "style": {
    "basisLevel": "INTERMEDIATE",
    "complexityLevel": "BEGINNER",
    "namesLevel": "BEGINNER",
    "classLength": -1,
    "methodLength": -1,
    "cyclomaticComplexity": -1,
    "fieldsCount": -1,
    "variableNamePattern": "[a-z][a-zA-Z0-9]*",
    "methodNamePattern": "[a-z][a-zA-Z0-9]*",
    "methodParameterNamePattern": "[a-z][a-zA-Z0-9]*",
    "classNamePattern": "[A-Z][a-zA-Z0-9_]*"
  }
}
```

**Private implementation**: [test.zip](https://qped-eu.github.io/mass/files/test.zip)

### Sub Question c)

**MASS configuration**:

```json
qf.mass = {
  "styleSelected": true,
  "semanticSelected": false,
  "coverageSelected": true,
  "classSelected": false,
  "metricsSelected": false,
  "syntax": {
    "level": "BEGINNER"
  },
  "coverage": {
    "feedback": [],
    "showTestFailures": true,
    "showFullCoverageReport": true
  },
  "style": {
    "basisLevel": "INTERMEDIATE",
    "complexityLevel": "BEGINNER",
    "namesLevel": "BEGINNER",
    "classLength": -1,
    "methodLength": -1,
    "cyclomaticComplexity": -1,
    "fieldsCount": -1,
    "variableNamePattern": "[a-z][a-zA-Z0-9]*",
    "methodNamePattern": "[a-z][a-zA-Z0-9]*",
    "methodParameterNamePattern": "[a-z][a-zA-Z0-9]*",
    "classNamePattern": "[A-Z][a-zA-Z0-9_]*"
  }
}
```
