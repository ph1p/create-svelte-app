import { prompt } from 'inquirer';
import { exec } from 'child_process';

export const createCommand = (cmd, { force, template }) => {
  if (!cmd) {
    cmd = 'my-svelte-project';
  }

  console.log(template);

  prompt(
    template === ''
      ? [
        {
          type: 'list',
          name: 'template',
          message: 'Choose a template',
          choices: [
            'sveltejs/template',
            'sveltejs/template-webpack',
            'sveltejs/component-template',
            'sveltejs/template-custom-element',
          ],
          filter: function (val) {
            return val.toLowerCase();
          },
        },
      ]
      : []
  )
    .then((answers) => {
      if (answers.template) {
        template = answers.template;
      }

      exec(
        `npx degit ${template} ${cmd} ${force && '--force'}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(stderr);
            return;
          }
          console.log(stdout || stderr);
        }
      );
    });
};
