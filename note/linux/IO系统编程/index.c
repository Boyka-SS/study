#include <stdio.h>
#include <unistd.h>

int main(int argc, char* argv[]) {
  char buf[] = "hello linux\n";
  char read_buf[128] = {0};
  FILE* fp = fopen("./a.c", "w+");
  if (fp == NULL) {
    printf("open a.c failure\n");
    return -1;
  }
  printf("open a.c success\n");
  fputs(buf, fp);
  fgets(read_buf, 128, fp);
  printf("%s\n", read_buf);
  fclose(fp);
  return 0;
}