# Interfaces Design Plugin & MCP Server for Google Antigravity

[![Antigravity Plugin](https://img.shields.io/badge/Antigravity-Plugin-38bdf8.svg)](https://antigravity.google)
[![MCP Server](https://img.shields.io/badge/MCP-Protocol%202024--11--05-6366f1.svg)](https://modelcontextprotocol.io)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-success.svg)](package.json)
[![WCAG 2.2](https://img.shields.io/badge/WCAG-2.2%20AA-a855f7.svg)](https://www.w3.org/TR/WCAG22/)

Нативный плагин и локальный MCP-сервер для **Google Antigravity** (IDE, CLI и Agentic workflows), портированный и оптимизированный из дизайн-инженерного комплекта `jakubkrehel/skills`. 

Включает в себя:
- **14 специализированных скиллов** (автоматический запуск и через слэш-команды `/<skill-name>`).
- **Автономный MCP-сервер** (`interfaces-design-mcp`) с 0 внешних зависимостей (чистый Node.js stdio).
- **Фонового сабагента** `ui-design-auditor` для параллельного аудита верстки.
- **Постоянные правила** (`rules/AGENTS.md` и `rules/better-design-system.md`) со строгим качественным порогом из 13 триггеров.

---

## 📁 Структура репозитория

```text
c:\harness\designe/
├── plugin.json                       # Манифест плагина Antigravity (v1)
├── mcp_config.json                   # Декларация MCP-сервера внутри плагина
├── mcp-server.mjs                    # Локальный stdio MCP-сервер (WCAG, OKLCH, Radii)
├── package.json                      # Модуль Node.js (0 npm dependencies)
├── test-mcp.mjs                      # Тест верификации MCP-сервера
├── assets/
│   └── logo.svg                      # Векторный логотип для интерфейса Antigravity
├── rules/
│   ├── AGENTS.md                     # Always-on правило для активного плагина
│   └── better-design-system.md       # Rule с trigger: model_decision
├── agents/
│   └── ui-design-auditor.md          # Фоновый сабагент для аудита интерфейсов
└── skills/                           # 14 процедурных скиллов
    ├── better-interface/             # Оркестратор полного ревью (6 доменов)
    ├── better-ui/                    # Концентрические радиусы, тени, анимация 0.96
    ├── better-typography/            # Безразмерный line-height, 60-75ch, tabular-nums
    ├── better-colors/                # OKLCH палитры 50-950, семантические токены
    ├── better-accessibility/         # WCAG 2.2 AA, клавиатурная навигация, формы
    ├── better-layout/                # Воздух, RTL логические свойства, 100dvh
    ├── better-writing/               # Продуктовый копирайтинг, глаголы в кнопках
    ├── interface-review/             # Ревью git-диффов и PR без модификации дерева
    ├── explain-interface/            # Деконструкция живых UI/анимаций по слоям
    ├── break/                        # Стресс-тестирование на временном стенде
    ├── build-design/                 # Точная верстка по Figma с маппингом токенов
    ├── technical-drawing/            # Чертежи SVG/PNG/PDF и HTML-просмотрщик
    ├── state-machine/                # Стенд всех состояний компонента (?__state=)
    └── variant/                      # 3-5 дизайн-вариантов на реальной странице (?__variant=)
```

---

## 🛠 Инструменты MCP-сервера (`interfaces-design-mcp`)

MCP-сервер работает по стандартному протоколу stdio (JSON-RPC 2.0) и предоставляет агенту точные математические расчёты:

1. **`measure_wcag_contrast`**:
   - Точный расчёт коэффициента относительной яркости по стандарту WCAG 2.2.
   - Проверка порогов: `4.5:1` (обычный текст), `3.0:1` (крупный текст и границы контролов), `7.0:1` (AAA).
   - Подсказки по исправлению через канал светлоты `L` в OKLCH.
2. **`compute_concentric_radius`**:
   - Вычисление внешнего радиуса скругления по правилу: `R_outer = R_inner + padding + border`.
   - Проверка порога `24px` (при отступе > 24px контейнеры считаются независимыми поверхностями).
3. **`generate_oklch_ramp`**:
   - Построение 11-шаговой шкалы `50–950` с постоянным оттенком (`hue`), пиком chroma в середине и шагом `0.04–0.05 L` на светлом конце.
4. **`get_design_checklist`**:
   - Выдача чек-листов `Before you finish` по доменам (`ui`, `typography`, `colors`, `layout`, `accessibility`, `writing`, `all`).

Проверка работы сервера:
```bash
node test-mcp.mjs
```

---

## 🚀 Руководство по подключению к Antigravity

Вы можете подключить плагин любым из следующих способов:

### Вариант 1. Установка в глобальные плагины Antigravity (Рекомендуется)
Скопируйте папку плагина в директорию глобальных плагинов Antigravity:
```powershell
# Windows PowerShell:
Copy-Item -Path "c:\harness\designe" -Destination "$HOME\.gemini\config\plugins\interfaces-design" -Recurse -Force
```
После перезапуска Antigravity IDE плагин появится в меню **Customizations → Installed** со всеми 14 скиллами, MCP-сервером и правилами.

### Вариант 2. Подключение только для текущего воркспейса (Workspace)
Если плагин нужен только в конкретном проекте, поместите его в:
```text
<ваш-проект>/.agents/plugins/interfaces-design/
```

### Вариант 3. Автономное подключение MCP-сервера в `mcp_config.json`
Если вы хотите использовать только MCP-инструменты без установки всего плагина, добавьте в `~/.gemini/config/mcp_config.json` (или `.agents/mcp_config.json`):
```json
{
  "mcpServers": {
    "interfaces-design-mcp": {
      "command": "node",
      "args": [
        "c:/harness/designe/mcp-server.mjs"
      ],
      "env": {
        "DESIGN_STRICT_MODE": "true"
      }
    }
  }
}
```

---

## 💬 Сценарии использования в чате Antigravity

| Команда / Запрос | Что делает агент |
| :--- | :--- |
| `Сверстай карточку тарифа` | Срабатывает правило `better-design-system.md`: агент считает концентрический радиус, задаёт `tabular-nums` ценам, `scale(0.96)` кнопке и проверяет WCAG 2.2 контраст. |
| `/variant сделай 3 варианта шапки по оси плотности` | Генерирует 3 варианта (`Compact`, `Standard`, `Spacious`) за URL-параметром `?__variant=` и выводит матрицу компромиссов. |
| `/break протестируй компонент OrderCard` | Создаёт временный роут и рендерит компонент во всех экстремальных состояниях (длинные строки, 0/1000 элементов, RTL, 320px). |
| `/state-machine собери состояния таблицы` | Поднимает стенд с реалистичными мок-данными и переключателем `?__state=`. |
| `/interface-review` | Анализирует git diff или PR на предмет потери `:focus-visible`, `aria-label`, адаптивности и регрессий. |
| `/build-design <ссылка на Figma / скриншот>` | Извлекает токены, маппит их на систему проекта (округление `<= 2px`) и верстает компонент. |

---

## 📦 Публикация в Git

1. Инициализируйте репозиторий и создайте первый коммит:
   ```bash
   cd c:\harness\designe
   git init
   git add .
   git commit -m "feat: initial commit of interfaces-design plugin & mcp server"
   ```

2. Привяжите удалённый репозиторий на GitHub и отправьте код:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<ваш-аккаунт>/interfaces-design.git
   git push -u origin main
   ```
