# JSON to CSV
Converts a JSON or group of JSON files to CSV files based on a field definition.

# Install
```bash
npm i irrelon-json-to-csv
```

# Usage
Create a field definition .js file. This will export (via commonjs / node.js module standard)
an object describing the keys and paths to the data to export as csv.

Field Definition File (exampleFields.js)
```js
module.exports = [{
	title: 'User ID',
	path: `id`
}, {
	title: 'Email Address',
	path: `user.auth.email`,
	transform: (data) => {
		return data.replace(/'/g, '');
	}
}];
```

Given a json file with an array of objects (exampleData.json)
```json
[{
	"id": "1",
	"user": {
		"auth": {
			"email": "'foo@bar.com'"
		}
	}
}]
```

Running from command line:
```bash
cd irrelon-json-to-csv
node index.js ./exampleFields.js ./exampleData.json
```

The output will be a CSV file (output_1.csv):
```csv
User ID,Email Address
1,foo@bar.com
```