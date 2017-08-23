for file in ~/Desktop/macke_results/*/*.dot.json; do
    python3.5 node_attributes.py $file /home/ricardo/Desktop/macke_results/CVSS_3_scores.json
done;

for file in ~/Desktop/macke_results/*/*node_attributes.json; do
    cp $file /home/ricardo/Desktop/macke_results/Node_attributes
done;
