## Impact	factors	for	severity	assessment	of	bugs	discovered	via compositional	symbolic	execution
### By Ricardo Nales, supervised by Saahil Ognawala
---------------------------------------
### Task list (08.06.2017)
- [x] How to extract callgraphs using LLVM Opt.
- [x] Get NVD bugs for 15 years ( for the ones that have CVSS3 available )
  - [x] Filter entries by CVSS3 and CVE_probelmtype_data = CWE-119
  - [x] Description must value must have "function" and ".c"
- [x] For all filtered bugs get program name, version and link
- [x] Download sources of filtered programs.
- [ ] Google Sheets link to Saahil. Create a tuple for each individual program.  

- Programs to Download
  * ytnef 1.9.2
    - lib/ytnef.c-> DecompressRTF, SwapDWord, SwapWord
  * ImageMagick 7.0.5-5
    - coders/psd.c -> ReadPDBImage
    - coders/pdb.c -> ReadPDBImage
    - mpc.c        -> ReadMPCImage
    - palm.c       -> ReadPALMImage
    - icon.c:452   -> ReadICONImage
  * LibTIFF 4.0.7
    - tif_dirread.c -> TIFFReadDirEntryLong8Array
    - tif_ojpeg.c   -> OJPEGReadHeaderInfoSecTablesQTable
  * AutoTrace 0.31.1
   - input-tga.c:620:27 -> ReadImage ( in pretty much all functions )
   - input-tga.c:252:15 -> rle_fread
 * LibRaw versions before 0.18.2
 * Gnulib before 2017-04-26
 * libimobiledevice/libplist before 2017-04-19
 * libosip2 in GNU oSIP 4.1.0 and 5.0.0
 * elfutils 0.168

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
