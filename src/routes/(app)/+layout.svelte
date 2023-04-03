<div class="h-screen max-h-screen w-screen grid grid-rows-layout">
  <nav class="h-[44px] bg-primary flex flex-row items-center px-1 py-1.5 text-white">
    <ul>
      <li>
        <form method="POST" action="/logout">
          <button type="submit">Logout</button>
        </form>
      </li>
    </ul>
  </nav>

  <slot />

  <div />
</div>
