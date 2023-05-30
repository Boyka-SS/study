#include <stdio.h>
#include <unistd.h>
int main(int argc, char* argv[]) {
  char buf[] = "hello linux";
  int i = 0;
  while (i < 95) {
    printf("%s", buf);
    i++;
  }
  while (1)
    ;
  return 0;
}