## Impact	factors	for	severity	assessment	of	bugs	discovered	via compositional	symbolic	execution
### By Ricardo Nales, supervised by Saahil Ognawala
---------------------------------------
### Task list (31.08.2017)
- [x] Read about two classifiers
- [ ] Create script for generating X and Y (based on scikit-learn requirements)
- [ ] Run both classifiers on X and Y and put results on git
- [ ] Prepare presentation dry-run

### Task list (17.08.2017)
- [x] Send title and abstract of mid-term presentation.
- [x] Check how distance_to_interface calculates the distance and what is None (should be infinite or a very big number).
- [x] Fix macke_bug_chain_length function, according to the comments in node_attributes.py.  
- [x] Generate covariance and correlation matrices again.

### Task list (27.07.2017)
- [x] Add Macke attributes to the attribute list (JSON)
  - [x] Bug chain length
  - [x] Number of vulnerabilities inside the function
- [x] Co-relation between node attributes (including everything) and CVSS base score
  - [x] For each node attribute (eg. centrality, path-length) calculate co-relation to each CVSS base score metric.
- [x] For user presentation, use the line number given by Macke, and not the one given by CVSS scores. **This can't be done for all, since ptr.err are not generated 100% of the time**
- [x] HTML front-end for displaying vulnerability report.

### Task list (20.07.2017)
- [x] Extract dot files for all compiled programs.
- [x] Format the output of node_attributes+CVSS scores as structured JSON.
- [x] Compare to the existing list from CVSS database.
  - [x] See if you can find the line of code described in the bug report from CVSS
- [ ] Co-relation between node attributes (including everything) and CVSS base score
  - [ ] For each node attribute (eg. centrality, path-length) calculate co-relation to each CVSS base score metric.

### Task list (17.07.2017)
- [x] Run Macke on all "relevant" bc files.
  - [x] Get a list of all vulnerabilities reported by Macke.
    - [x] Separate list into found-only-by-macke, not-found-by-macke, found-by-both-macke-and-cvss-database
  - [x] Compare to the existing list from CVSS database.

### Task list (06.07.2017)
- [x] Fix all the node attributes
  - [x] Use instructions from graph-attributes.md and node_attributes.py
- [x] Investigate for a prototype for converting json file to javascript representation.
- [x] Run Macke on all "relevant" bc files.
  - [x] Get a list of all vulnerabilities reported by Macke.
  - [x] Compare to the existing list from CVSS database.
    - [x] See if you can find the line of code described in the bug report from CVSS
  - [x] After the above is complete, calculate the other graph features as well.

### Task list (30.06.2017)
- [x] Read : https://www.cs.purdue.edu/mlg2011/papers/paper_1.pdf
  - [x] Create function that parses through a JSON and generates the values for each of the relevant attributes mentioned in this paper.
- [x] Read about the severity function from: https://mediatum.ub.tum.de/doc/1329071/1329071.pdf
- [x] Learn to use the correlation function (https://docs.scipy.org/doc/numpy/reference/generated/numpy.corrcoef.html)
- [x] Transform .dot graphs to .json (dot_to_json.py)

### Task list (22.06.2017)
- [x]  Compile all programs with make+llvm.
  - [x] Check for dependencies, and install them
- [x] Create callgraphs for all of them.
- [x] Mark functions that have the vulnerabilities.

### Task list (08.06.2017)
- [x] How to extract callgraphs using LLVM Opt.
- [x] Get NVD bugs for 15 years ( for the ones that have CVSS3 available )
  - [x] Filter entries by CVSS3 and CVE_probelmtype_data = CWE-119
  - [x] Description must value must have "function" and ".c"
- [x] For all filtered bugs get program name, version and link
- [x] Download sources of filtered programs.
- [x] Google Sheets link to Saahil. Create a tuple for each individual program.  

### Task list (01.06.2017)
- [x] Proposal on user interface for assessment tool. (Wireframe only)
- [x] Look at the complete output of Macke on Kaleidoscope programs. (Don't save in /tmp)
  - [x] Which fields are indicative of attack complexity and why?
- [x] Look at GNU Bugzilla repositories to learn about known severities.
  - [x] List all required and optional fields in Bugzilla.
  - [x] Which fields are indicative of attack complexity?

### Task list (26.05.2017)
- [x] Read papers regarding CVSS (https://www.first.org/cvss/calculator/3.0)
- [x] Solve a maze using KLEE (https://feliam.wordpress.com/2010/10/07/the-symbolic-maze/)

### Task list (18.05.2017)
- [x] Read papers for severity assessment
- [x] Send docker link to thomas and saahil by email (ricardonales/macke:0.6)
- [x] Run KLEE on all Kaleidoscope programs
- [x] Install macke from tum-i22 github page
- [x] Run all kaleidoscope programs with Macke
  - [x] Play around with all options
  - [x] Run with multiple time limits (per function)
  - [x] Look at the outputs, and compare to KLEE outputs

### Task list (15.05.2017)
- [x] Create Bitbucket repo and grant me (“saahil") access.
- [x] List of programs for which bitcodes can be automatically generated.     https://github.com/hutoTUM/bitcode-kaleidoscope
- [x] Run tutorial one and two from KLEE’s website. https://klee.github.io
- [x] Read Macke paper (attached) and its related works.
---------------------------------------
