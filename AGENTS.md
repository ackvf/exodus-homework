# README files

Whenever there is a README.md file in a directory, be sure to read it and follow any instructions or guidelines it contains. This is mandatory.

# Read scope and performance

If another file is referenced in any document you have read, decide whether to read it based on relevance for the current task. For example, when discovering skills, first read the skill name, description, and routing notes to determine if the skill is relevant before reading the full document.

If you are tasked to do something that has a relevant skill, then you must read the full skill document to understand how to use it and follow any instructions guidelines it contains. If those documents link to other files, apply the same process recursively.

# Ignoring files and folders

If your AI tool does not support `.copilotignore`, configure that tool's own ignore file/settings to mirror all patterns from [`.copilotignore`](.copilotignore).

# ExecPlans

When writing complex features or significant refactors, create and use an `ExecPlan` (as described in [PLANS.md](.agents/PLANS.md)) from design to implementation.

You can find existing ExecPlans in this folder (.agents).

Once an ExecPlan is finished, move it to [archive/](.agents/archive/) directory per its completion instructions; if missing use the guidelines in [PLANS.md](.agents/PLANS.md).

# Architecture and design guidelines

Refer to [ARCHITECTURE.md](ARCHITECTURE.md) for architecture, design guidelines and project structure.

# Skills and tools

Never read a full skill file unless performing a task within that skill's scope. Use the skill name/description and these routing notes to decide relevance first.
