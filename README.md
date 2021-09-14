* Instructions to open the project.
1. Copy the repository link.
2. Open visual studio code.
3. Using clone "repo-link" command clone the repository.

* Project Dependencies 
1. 'file_path' variable requires csv file's path.
2. Download any state's csv file using the below link.
3. https://data.gov.in/catalog/company-master-data?filters%5Bfield_catalog_reference%5D=354261&format=json&offset=0&limit=6&sort%5Bcreated%5D=desc

* About Project
1. jsonGeneration Reads csv file and fetches the required data fields.
2. Stores the required data filed's values in required format in an object.
3. All the four objects and *.json file paths are stored in array.
4. That array is passed as input to the json conversion function.
5. Objects will be converted as *.json 
6. *.json file's data used in script.js file to plot the graph.   