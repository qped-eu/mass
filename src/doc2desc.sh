cat ./mass.schema.json | sed 's/\"description\"/\"description_\"/g' | sed 's/\"documentation\"/\"description\"/g' > ./mass_.schema.json
generate-schema-doc --config-file ./mass-docgen-conf.yaml ./mass_.schema.json ../public/mass.md
rm ./mass_.schema.json
mkdir ../public/schemas
cp ./mass.schema.json ../public/schemas/mass.schema.json
