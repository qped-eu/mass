//@ts-nocheck
export function readFile(file:File): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          resolve(content);
        };
        reader.onerror = (event) => {
          reject(new Error("Error reading file"));
        };
        reader.readAsText(file);
      } catch (error) {
        reject(error);
      }
    });
  }


export function getPositionString(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

export function getParsedDate(): string{
  const parseTime = function(timeElement: number): string{
    return timeElement < 10 ? "0"+timeElement : ""+timeElement;
  }
  let currentdate = new Date(); 
  let datetime =  parseTime(currentdate.getDate()) + "."
                  + parseTime(currentdate.getMonth()+1)  + "." 
                  + parseTime(currentdate.getFullYear()) + " "  
                  + parseTime(currentdate.getHours()) + ":"  
                  + parseTime(currentdate.getMinutes()) + ":" 
                  + parseTime(currentdate.getSeconds());
  return datetime;
}


export function calculateTxtFileWeight(text: string, round): number {
  // Calculate the weight of the string in bytes
  //const bytes = Buffer.byteLength(text, 'utf8');
  
  // Assuming each character in the string is encoded using UTF-8
  const bytesPerCharacter = 1;
  
  // Calculate the total number of bytes
  const totalBytes = text.length * bytesPerCharacter;
      
  // Convert bytes to kilobytes
  const totalKilobytes = totalBytes / 1024;
    
  return Math.round(totalKilobytes * (10**round)) / 100;
}


/**
 * Function to compare two JSON objects and checks if they are equal.
 * The logic is based on recursively comparing each key-value pair in the objects.
 * 
 * @param obj1 The first JSON object.
 * @param obj2 The second JSON object.
 * @returns Returns true if the objects are equal, false otherwise.
 */
export function isEqualJSON(obj1: any, obj2: any): boolean {
  // Check if both objects are of type object
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
      return false;
  }

  // Check if both objects have the same number of keys
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
      return false;
  }

  // Recursively compare each key-value pair in the objects
  for (let key of keys1) {
      // Check if the key exists in both objects
      if (!obj2.hasOwnProperty(key)) {
          return false;
      }

      // Check if the values are equal
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (typeof value1 === "object" && typeof value2 === "object") {
          // Recursively compare nested objects
          if (!isEqualJSON(value1, value2)) {
              return false;
          }
      } else if (value1 !== value2) {
          return false;
      }
  }

  return true;
}


/**
 * Verify that a string that is cast to a JSON object has at least the same keys and value types as a default given string that is cast to a JSON object
 * 
 * @param configTxt The string to cast to json object, which keys and value's types will be compared with those of @param defaultTxt
 * @param defaultTxt The default string to transform in json object for comparison
 * @returns Returns boolean true if the @param configTxt transformed to json have all the keys present in @param defaultTxt
 */
export function isCorrectJsonSkeleton(configTxt: string, defaultTxt: string): boolean{
  let jsonParsedConfig = JSON.parse(configTxt);
  let jsonDefault = JSON.parse( defaultTxt );

  // Check if both the object to check have the same number of keys or more than the default
  const keysParsedConfig = Object.keys(jsonParsedConfig);
  const keysDefault = Object.keys(jsonDefault);
  if (keysParsedConfig.length < keysDefault.length) {
      return false;
  }

  // Recursively compare each key-value pair in the objects
  for (let key of keysDefault) {
      // Check if the key exists in both objects
      if (!(keysParsedConfig.includes(key))) {
          return false;
      }

      // Check if the values are the same type
      const value1 = jsonParsedConfig[key];
      const value2 = jsonDefault[key];
      if (typeof value1 === "object" && typeof value2 === "object") {
          // Recursively compare nested objects
          if (!isCorrectJsonSkeleton(JSON.stringify(value1), JSON.stringify(value2))) {
              return false;
          }
      } else if (typeof value1 !== typeof value2) {
          return false;
      }
  }
  return true;
}



/**
 * Download a zip file from a given URL and put it in an input file field.
 * 
 * @param url The URL of the zip file to download.
 * @param inputFieldId The ID of the input file field to put the downloaded file in.
 * @returns Returns a Promise that resolves when the file is successfully downloaded and put in the input field, or rejects with an error message.
 */
export function downloadZipFile(url: string, inputFieldId: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
      // Validate the input
      if (!url || !inputFieldId) {
          reject("Invalid input. URL and input field ID are required.");
      }

      // Fetch the zip file
      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Failed to download zip file. Status: ${response.status} ${response.statusText}`);
              }
              return response.blob();
          })
          .then(blob => {
              // Create a new FileReader
              const reader = new FileReader();

              // Set the onload event handler to put the file contents in the input field
              reader.onload = () => {
                  const fileContents = reader.result;
                  const inputFile = document.getElementById(inputFieldId) as HTMLInputElement;
                  const fileValue = new File([fileContents], "downloaded.zip");

                  // Create a DataTransfer to get a FileList
                  const dataTransfer = new DataTransfer();
                  dataTransfer.items.add(fileValue);
                  
                  //Add files in principal file's input-field
                  inputFile.files = dataTransfer.files;
                  resolve();
              };

              // Read the blob as Array Buffer
              reader.readAsArrayBuffer(blob);
            
          })
          .catch(error => {
              reject(`Failed to download zip file. ${error.message}`);
          });
  });
}
