const files = process.argv.slice(2);

if (!files.length) {
	console.log('Please provide the path to your field definition .js file!');
	process.exit(1);
}

const fieldsDefinitionFile = files.shift();

if (!files.length) {
	console.log('Please provide a path to at least one JSON file!');
	process.exit(1);
}

const fs = require('fs');
const Path = require('irrelon-path');
const pathSolver = new Path();
const fields = require(fieldsDefinitionFile);

const fileData = files.map((filePath) => {
	return require(filePath);
});

const fileHeader = fields.map((item) => { return item.title; }).join(',');

const index = (data) => {
	const reportData = data.map((item) => {
		const fieldData = fields.map((field) => {
			const returnData = pathSolver.get(item, field.path);
			
			if (field.transform) {
				return field.transform(returnData);
			}
			
			return returnData;
		});
		
		return fieldData.join(',');
	});
	
	return [fileHeader, ...reportData].join('\n');
};

const results = fileData.map((data) => {return index(data);});

results.forEach((resultData, index) => {
	fs.writeFileSync(`output_${index + 1}.csv`, resultData, 'utf8');
});