cat ./src/mass.schema.json | sed 's/\"description\"/\"description_\"/g' | sed 's/\"documentation\"/\"description\"/g' > ./mass_.schema.json
generate-schema-doc --config-file ./src/mass-docgen-conf.yaml ./Pages/Configurator/mass_.schema.json ./public/markdown/mass-doku.md
rm ./mass_.schema.json
