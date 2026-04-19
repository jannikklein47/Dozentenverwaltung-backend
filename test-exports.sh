#!/bin/bash

TOKEN=""

BASE_URL="http://localhost:3000/api/v1.0/app/reports"

echo "Downloading JSON and CSV exports..."

# 1. Vorlesungen ohne Dozenten (Format 3)
curl -s -o "report-format-3(vorlesungen-ohne-dozenten).json" -H "Authorization: Bearer $TOKEN" "$BASE_URL/lectures/without-professor?format=json"
curl -s -o "report-format-3(vorlesungen-ohne-dozenten).csv" -H "Authorization: Bearer $TOKEN" "$BASE_URL/lectures/without-professor?format=csv"
echo "Downloaded Lectures without Professor (Format 3)"

# 2. Vorlesungen ohne Provadis Erfahrung (Format 4)
curl -s -o "report-format-4(vorlesungen-ohne-provadis-erfahrung).json" -H "Authorization: Bearer $TOKEN" "$BASE_URL/lectures/without-provadis-experience?format=json"
curl -s -o "report-format-4(vorlesungen-ohne-provadis-erfahrung).csv" -H "Authorization: Bearer $TOKEN" "$BASE_URL/lectures/without-provadis-experience?format=csv"
echo "Downloaded Lectures without Provadis Experience (Format 4)"

# 3. Professoren mit Provadis Vorlesungen (Format 1)
curl -s -o "report-format-1(professoren-mit-provadis-vorlesungen).json" -H "Authorization: Bearer $TOKEN" "$BASE_URL/professors/with-provadis-lectures?format=json"
curl -s -o "report-format-1(professoren-mit-provadis-vorlesungen).csv" -H "Authorization: Bearer $TOKEN" "$BASE_URL/professors/with-provadis-lectures?format=csv"
echo "Downloaded Professors with Provadis Lectures (Format 1)"

echo "All files downloaded successfully!"