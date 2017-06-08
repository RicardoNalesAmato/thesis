## Impact	factors	for	severity	assessment	of	bugs	discovered	via compositional	symbolic	execution
### By Ricardo Nales, supervised by Saahil Ognawala
---------------------------------------
### Task list (08.06.2017)
- [ ] How to extract callgraphs using LLVM Opt.
- [ ] Get NVD bugs for 15 years ( for the ones that have CVSS3 available )
  - [ ] Filter entries by CVSS3 and CVE_probelmtype_data = CWE-119
  - [ ] Description must value must have "function" and ".c"
- [ ] For all filtered bugs get program name, version and link
- [ ] Download sources of filtered porgrams.
- [ ] Google Sheets link to Saahil. Create a tuple for each individual program.  

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
